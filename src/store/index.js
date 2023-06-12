/* eslint-disable no-console */
import { defineStore } from 'pinia';
//import { promoWeb } from '@mkweb/promo-web';

export const usePromoStore = defineStore('promo', {
  state: () => {
    return {
      data: null,
    };
  },
  actions: {
    // async loadPromoData() {
    //   try {
    //     const promoWebStore = promoWeb();
    //     const gid = promoWebStore.getSCConfig.FieldValues.Parameters.gid;
    //     const { customerId, label, language, sessionToken, userToken } = promoWebStore.promoConfig;
    //     let queryParameters = `label=${label}&language=${language}&gid=${gid}`;
    //     let headers = {};
    //     if (customerId) {
    //       queryParameters += `&userid=${customerId}`;
    //       headers = {
    //         'x-bwin-session-token': sessionToken,
    //         'x-bwin-user-token': userToken,
    //       };
    //     }

    //     const response = await fetch(`${promoWebStore.getApi}/v1/xpredictors/promotions/last?${queryParameters}`, {
    //       headers,
    //     });
    //     const data = await response.json();
    //     if (data.code === 'S001') {
    //       console.log(data);
    //     } else {
    //       console.error('MTT Score Predictor Terminal', data);
    //     }
    //   } catch (e) {
    //     console.error('MTT Score Predictor Terminal', e);
    //   }
    // },
  },
});
