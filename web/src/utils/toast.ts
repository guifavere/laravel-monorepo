import { showNotification } from '@mantine/notifications';

export const toast = ({ title, message }: { title: string; message: string }) =>
  showNotification({ title, message });
