import { create } from 'zustand';
import { Task } from '../types';

interface EditModalState {
  isOpen: boolean;
  task: Task | null;
  openModal: (task: Task) => void;
  closeModal: () => void;
}

export const useEditModalStore = create<EditModalState>((set) => ({
  isOpen: false,
  task: null,
  openModal: (task) => set({ isOpen: true, task }),
  closeModal: () => set({ isOpen: false, task: null }),
}));