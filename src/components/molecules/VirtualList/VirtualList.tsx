import React from 'react';
import { Virtuoso } from 'react-virtuoso';
import { IVirtualListProps } from './VirtualList.types';
import EmptyScreenView from '@/components/templates/EmptyScreenView/EmptyScreenView';
import ActivityIndicator from '@/components/atoms/ActivityIndicator/ActivityIndicator';

const VirtualList: React.FC<IVirtualListProps> = ({
  data,
  isLoading,
  onReachEnd,
  headerView,
  emptyViewSubTitle,
  emptyViewTitle,
  illustration,
  renderItem,
  footerComponent,
  error,
  isDataEmpty,
  isLastPage,
  ...props
}) => {
  const listFooterComponent = () => {
    return (
      <div className="w-full mt-2 flex justify-center items-center">
        <ActivityIndicator size={36} />
      </div>
    );
  };
  return (
    <>
      {data.length > 0 && <div className="w-full">{headerView}</div>}
      {!isLoading && data.length === 0 ? (
        <div className="h-full flex justify-center items-center">
          <EmptyScreenView
            emptyViewTitle={emptyViewTitle}
            emptyViewSubTitle={emptyViewSubTitle}
            illustration={illustration}
            error={error}
            isDataEmpty={isDataEmpty}
          />
        </div>
      ) : (
        <>
          <Virtuoso
            data={data}
            components={{
              Footer:
                footerComponent ?? !isLastPage
                  ? listFooterComponent
                  : undefined,
            }}
            endReached={onReachEnd}
            itemContent={renderItem}
            {...props}
          />
        </>
      )}
    </>
  );
};

export default VirtualList;

{
  /* <Virtuoso
data={data.rows}
itemContent={(index) => {
  return (
    <div key={index} className="flex w-full  my-2 mx-6">
      <div className="animate-pulse w-12 h-12 bg-primary  flex items-center justify-center" />
    </div>
  );
}}
/> */
}

// (index, data) => {
//   const isSelected = selectedId === data.id;
//   const bgColor = isSelected ? 'bg-lightPrimary' : 'bg-white';
//   return (
//     <div
//       className={'px-6 py-3 ' + bgColor}
//       onClick={() => toggleSelect(data.id)}
//     >
//       <UserNameWithImage
//         key={index}
//         name={data.companyname ?? ''}
//         image={data.companylogo}
//       />
//     </div>
//   );
// }

// <div className="bg-white px-6 pt-4 pb-6">
// <CustomButton
//   fullWidth
//   disabled={!isButtonEnabled}
//   title={STRINGS.confirm}
//   onClick={() => console.log('Confirmed selection:', selectedId)}
//   buttonType={'primary-small'}
//   variant={'contained'}
// />
// </div>

// style={{
//   scrollbarWidth: 'none',
//   cursor: 'pointer',
// }}
