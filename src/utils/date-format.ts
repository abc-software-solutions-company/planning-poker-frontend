import 'dayjs/locale/en';
import 'dayjs/locale/vi';

import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.locale('vi');
dayjs.extend(LocalizedFormat);

export const formatDate = (date: string, locale = 'en') => dayjs(date).locale(locale).format('L');
