export type IUserImageRendererProps = {
  image: string | null;
  name: string;
  type: IUserImageRendererTypes;
};

export type IUserImageRendererTypes = 'white' | 'green' | 'red';

export const getStylesAttributes = (type: IUserImageRendererTypes) => {
  switch (type) {
    case 'white':
      return {
        backgroundColor: 'bg-white',
        textColor: 'text-textBlack',
      };
    case 'green':
      return {
        backgroundColor: 'bg-lightGreen',
        textColor: 'text-green',
      };
    case 'red':
      return {
        backgroundColor: 'bg-lightRed',
        textColor: 'text-red',
      };

    default:
      return {
        backgroundColor: 'bg-white',
        textColor: 'text-textBlack',
      };
  }
};
