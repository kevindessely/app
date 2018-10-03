import { AsyncStorage, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Branch from 'react-native-branch';

import { SEEN_MARKETING_CAROUSEL_KEY, IS_VIEWING_OFFER } from '../constants';
import { Store } from '../setupApp';

import { insuranceActions } from '../../hedvig-redux';
import { colors, fonts } from '@hedviginsurance/brand';

import { CHAT_SCREEN } from './screens/chat';
import { MARKETING_SCREEN } from './screens/marketing';
import { DASHBOARD_SCREEN } from './screens/dashboard';
import { PROFILE_SCREEN } from './screens/profile';
import { FAB_COMPONENT } from './components/fab';
import { NEW_OFFER_SCREEN } from 'src/navigation/screens/new-offer';
import { getMockLayout } from 'src/navigation/mock';
import { OFFER_SCREEN } from 'src/navigation/screens/offer';

import { getOfferGroup } from 'src/navigation/screens/offer/ab-test';

export const getMarketingLayout = () => ({
  root: {
    stack: {
      children: [MARKETING_SCREEN],
    },
  },
});

export const getMainLayout = () => ({
  root: {
    bottomTabs: {
      children: [
        {
          stack: {
            children: [DASHBOARD_SCREEN],
            options: {
              bottomTab: {
                text: 'Hemförsäkring',
                icon: require('../../assets/icons/tab_bar/lagenhet.png'),
              },
            },
          },
        },
        {
          stack: {
            children: [PROFILE_SCREEN],
            options: {
              bottomTab: {
                text: 'Profil',
                icon: require('../../assets/icons/tab_bar/du_och_din_familj.png'),
              },
            },
          },
        },
      ],
    },
  },
  overlays: Platform.OS === 'ios' && [
    {
      component: {
        name: FAB_COMPONENT.name,
        options: {
          layout: {
            backgroundColor: 'transparent',
          },
          overlay: {
            interceptTouchOutside: false,
          },
        },
      },
    },
  ],
});

export const getChatLayout = () => ({
  root: {
    stack: {
      children: [CHAT_SCREEN],
    },
  },
});

export const getOfferLayout = async () => {
  if ((await getOfferGroup()) === 'new') {
    return {
      root: {
        stack: {
          children: [NEW_OFFER_SCREEN],
        },
      },
    };
  }

  return {
    modals: [
      {
        stack: {
          children: [OFFER_SCREEN],
        },
      },
    ],
    ...getChatLayout(),
  };
};

export const getInitialLayout = async () => {
  const referringParams = await Branch.getLatestReferringParams();
  const url = referringParams['+non_branch_link'] || '';

  if (url.includes('mock')) {
    return getMockLayout(url);
  }

  const alreadySeenMarketingCarousel = await AsyncStorage.getItem(
    SEEN_MARKETING_CAROUSEL_KEY,
  );

  if (!alreadySeenMarketingCarousel) {
    return getMarketingLayout();
  }

  Store.dispatch(insuranceActions.getInsurance());

  return new Promise((resolve) => {
    const unsubscribe = Store.subscribe(async () => {
      const { insurance } = Store.getState();

      if (!insurance.status) return;

      unsubscribe();

      if (
        ['ACTIVE', 'INACTIVE_WITH_START_DATE', 'INACTIVE'].includes(
          insurance.status,
        )
      ) {
        return resolve(getMainLayout());
      }

      const isViewingOffer = await AsyncStorage.getItem(IS_VIEWING_OFFER);

      if (isViewingOffer) {
        const OFFER_LAYOUT = await getOfferLayout();
        return resolve(OFFER_LAYOUT);
      }

      return resolve(getChatLayout());
    });
  });
};

export const setLayout = ({ root, modals = [], overlays = [] }) => {
  Navigation.setDefaultOptions({
    topBar: {
      animate: false,
      title: {
        fontFamily: fonts.CIRCULAR,
      },
      subtitle: {
        fontFamily: fonts.CIRCULAR,
      },
      leftButtons: {
        fontFamily: fonts.CIRCULAR,
      },
      rightButtons: {
        fontFamily: fonts.CIRCULAR,
      },
      largeTitle: {
        fontFamily: fonts.CIRCULAR,
        fontSize: 30,
      },
    },
    statusBar: {
      visible: true,
      drawBehind: false,
      blur: true,
    },
    bottomTab: {
      iconColor: colors.DARK_GRAY,
      selectedIconColor: colors.PURPLE,
      textColor: colors.DARK_GRAY,
      selectedTextColor: colors.PURPLE,
      fontFamily: fonts.CIRCULAR,
      fontSize: 13,
    },
    layout: {
      backgroundColor: 'white',
    },
  });

  Navigation.setRoot({
    root,
  });

  if (modals) {
    modals.forEach((modal) => Navigation.showModal(modal));
  }

  if (overlays) {
    overlays.forEach((overlay) => Navigation.showOverlay(overlay));
  }
};

export const setInitialLayout = async () => {
  const layout = await getInitialLayout();
  setLayout(layout);
};
