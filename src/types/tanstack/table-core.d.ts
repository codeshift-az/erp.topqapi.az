import "@tanstack/table-core";

declare module "@tanstack/table-core" {
  interface ColumnMeta<TData, TValue> {
    filterComponent: (props: any) => any;
  }
}
