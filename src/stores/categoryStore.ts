import { get, writable, Writable } from 'svelte/store';
import { Category } from '../components/models';
import type { ICategory } from '../components/models/Category';
import { http } from '../http';
import { doFetch } from '../utils';

const URLS = {
  CATEGORY: '/api/category',
  CATEGORY_ID: (id: string) => `/api/category/${id}`,
}

class CategoryStore {
  categories: Writable<Category[]>;
  newCategory: Writable<Category>;
  selectedCategory: Writable<Category>;

  constructor() {
    this.categories = writable([]);
    this.newCategory = writable(new Category(undefined));
    this.selectedCategory = writable(new Category(undefined));
  }

  // getCategories fetches all the categories.
  getCategories = async () => {
    const { status, data } = await doFetch(URLS.CATEGORY, 'GET');

    if (status !== http.STATUS_OK) {
      throw new Error('FAILED_TO_FETCH_CATEGORIES');
    }

    const categories = data.reduce((categories, category) => {
      categories.push(new Category(category))
      return categories
    }, [])

    this.categories.set(categories);
  }

  // getCategoryById fetches the category by id.
  getCategoryById = async (id: string) => {
    const { status, data: currentCategory } = await doFetch(URLS.CATEGORY_ID(id), 'GET');

    if (status !== http.STATUS_OK) {
      throw new Error('FAILED_TO_FETCH_CATEGORY');
    }

    this.selectedCategory.update(selectedCategory => {
      selectedCategory = currentCategory;
      return selectedCategory;
    })
  }

  // setSelectedCategory changes the selected category to the given category.
  setSelectedCategory = (category: Category) => {
    this.selectedCategory.set(category);
  }

  // postCategory creates a new category.
  postCategory = async () => {
    const { status, data: category } = await doFetch(URLS.CATEGORY, 'POST',
    get(this.newCategory)) as { status: number, data: ICategory };

    if (status !== http.STATUS_OK) {
      throw new Error('failed_to_post_category');
    }

    this.categories.update(categories => {
      categories.push(new Category(category));
      return categories;
    })
  }

  // updateCategory updates an existing category.
  updateCategory = async () => {
    const category = get(this.selectedCategory)
    const { status } = await doFetch(URLS.CATEGORY_ID(category.id), 'PUT', category);

    if (status !== http.STATUS_OK) {
      throw new Error('FAILED_TO_UPDATE_CATEGORY');
    }

    this.categories.update(categories => {
      const index = categories.indexOf(category);
      if (index > -1) {
        categories[index] = category;
      }

      categories.sort((a, b) => {
        return a.order - b.order
      })

      return categories;
    })
  }

  // deleteCategory deletes an existing category.
  deleteCategory = async (category: Category) => {
    const { status } = await doFetch(URLS.CATEGORY_ID(category.id), 'DELETE');

    if (status !== http.STATUS_OK) {
      throw new Error('FAILED_TO_DELETE_CATEGORY');
    }

    this.categories.update(categories => {
      const index = categories.indexOf(category);
      if (index > -1) {
        categories.splice(index, 1);
      }

      categories.forEach(category => {
        category.order = categories.indexOf(category) + 1;

        this.setSelectedCategory(category);
        this.updateCategory();
      })

      return categories;
    })
  }
}

export default new CategoryStore();