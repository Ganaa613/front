export type EditItemProps = {
  item?: any;
  editItem?: (item: any) => void;
};

export type AddItemProps = {
  onAdd: (item: any) => void;
  onCancel: () => void;
};
