import { writable, Writable } from "svelte/store";

class ModalStore {
  activeModals: any[];
  registeredModals: any[];

  isModalOpen: Writable<boolean>;

  constructor() {
    this.activeModals = [];
    this.registeredModals = [];
    this.isModalOpen = writable(false);
  }

  register = (id: string, cb: (state: boolean) => void) => {
    this.registeredModals.push({
      id,
      cb,
    });
  };

  unregisterModal = (modalId) => {
    this.registeredModals = this.registeredModals.filter(modal => modal.id !== modalId);
  };

  openModal = (id: string) => {
    const matches = this.registeredModals.filter(modal => modal.id === id);

    matches.forEach(match => {
      match.cb(true);
      this.activeModals.push(match);
      this.isModalOpen.set(true);
    });
  };

  closeModal = (id: string) => {
    const matches = this.registeredModals.filter(modal => modal.id === id);

    matches.forEach(match => {
      match.cb(false);
      this.activeModals = this.activeModals.filter(activeModal => activeModal.id !== id);
      this.isModalOpen.set(this.activeModals.length > 0);
    });
  };

  closeModalWithOverlay = () => {
    if (this.activeModals.length > 0) {
      this.activeModals.forEach(modal => {
        modal.cb(false);
      });

      this.isModalOpen.set(false);
    }
  };
}

export default new ModalStore();
