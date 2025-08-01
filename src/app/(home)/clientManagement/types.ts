import { STRINGS } from '@/constant/en';
import { IClientStatus } from '@/constant/enums';

export const getClientStatusAttributesFromType = (status: IClientStatus) => {
  switch (status) {
    case IClientStatus.ACTIVE:
      return { styles: 'text-Green text-12', text: STRINGS.active };
    case IClientStatus.INACTIVE:
      return { styles: 'text-Red text-12', text: STRINGS.inActive };
    case IClientStatus.PENDING:
      return { styles: 'text-yellow text-12', text: STRINGS.pending };
    default:
      return { styles: 'text-yellow text-12', text: STRINGS.pending };
  }
};
