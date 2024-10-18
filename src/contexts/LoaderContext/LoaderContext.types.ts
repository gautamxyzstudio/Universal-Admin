export interface ILoaderContext {
  changeLoaderState: (value: boolean) => void;
}

export interface ILoaderContextProviderProps {
  children: React.ReactNode;
}
