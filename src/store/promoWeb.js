/* eslint-disable no-debugger */
/* eslint-disable no-console */
import {
    defineStore,
  } from 'pinia';

  export const promoWeb = defineStore('promoWeb', {
    state: () => {
      return {
        configApi: {
          casinoClub: {
            api: '//api-mk.itsfogo.com/casinoclub/api',
            betaApi: '//beta-api-mk.itsfogo.com/api',
          },
          coral: {
            api: '//api-mk.itsfogo.com/coral/api',
            betaApi: '//beta-api-mk.itsfogo.com/api',
          },
          foxy: {
            api: '//api-mk.itsfogo.com/foxy/api',
            betaApi: '//beta-api-mk.itsfogo.com/api',
          },
          gala: {
            api: '//api-mk.itsfogo.com/gala/api',
            betaApi: '//beta-api-mk.itsfogo.com/api',
          },
          us: {
            api: '//api-mk.itsfogo.com/us/api',
            betaApi: '//beta-api-mk.itsfogo.com/api',
          },
          we: {
            api: '//api-mk.itsfogo.com/api',
            betaApi: '//beta-api-mk.itsfogo.com/api',
          },
        },
        promoConfig: null,
        promoContent: null,
        isLoading: false,
        targetGroupID:null,
        overlays: {
          bonus: false,
          closed: false,
          generalError: false,
          loading: false,
          logIn: false,
          loser: false,
          notEnoughTickets: false,
          notQualified: false,
          optIn: false,
          pmp: false,
          ticketsInfo: false,
        },
      };
    },
    getters: {
      getApi: (state) => {
        const casinoClubLabels = ['casinoclub.com'];
        const coralLabels = ['coral.co.uk', 'ladbrokes.com'];
        const foxyLabels = ['foxybingo.com', 'foxygames.com', 'cheekybingo.com'];
        const galaLabels = ['galabingo.com', 'galacasino.com', 'galaspins.com'];
        const usLabels = ['nj.partycasino.com', 'on.betmgm.ca'];
        let regionConfig;
        if (casinoClubLabels.includes(state.promoConfig.label)) {
          regionConfig = state.configApi.casinoClub;
        } else if (coralLabels.includes(state.promoConfig.label)) {
          regionConfig = state.configApi.coral;
        } else if (foxyLabels.includes(state.promoConfig.label)) {
          regionConfig = state.configApi.foxy;
        } else if (galaLabels.includes(state.promoConfig.label)) {
          regionConfig = state.configApi.gala;
        } else if (usLabels.includes(state.promoConfig.label) || state.promoConfig.label.includes('borgataonline') || state.promoConfig.label
          .substring(3) === 'betmgm.com') {
          regionConfig = state.configApi.us;
        } else {
          regionConfig = state.configApi.we;
        }

        const useBeta = state.getSCConfig.FieldValues.Parameters.use_beta;
        return useBeta && useBeta.trim().toLowerCase() === 'true' ? regionConfig.betaApi : regionConfig.api;
      },
      getSCConfig: (state) => {
        return state.promoContent.find((obj) => obj.ItemName === 'config');
      },
      getSCItem: (state) => (name) => {
        return state.promoContent.find((obj) => obj.ItemName.startsWith(name));
      },
      // getImages(state, getters) {
      //   const imagesItem = getters.getSitecoreContent.find((item) => item.ItemName.toLowerCase() === 'images');
      //   return imagesItem ? imagesItem.FieldValues.Parameters : {};
      // },
      getImages: (state) => {
        const contentItem =
        // this.getSCItem("content");
        state.promoContent.find((item) => item.ItemName.toLowerCase() === 'content');
        const imagesItem= contentItem.ChildItems.find((obj) => obj.ItemName.toLowerCase() === 'images');
        return imagesItem.FieldValues.Parameters;
        // return state.promoContent.find((obj) =>{ if(obj.ItemName === 'content'){
        //   obj.ChildItems.ItemName==="images"
        // } );
      },
      isLoading: (state)=> {
        return state.isLoading;
      },
      getTargetGroupID: (state) => {
        const targetGroups = state.getSCConfig.ChildItems.find(
          (obj) => obj.ItemName === 'targetgroups',
        );
        if (targetGroups === undefined) return 'core';
        let result;
        Object.entries(targetGroups.FieldValues.Parameters).forEach(([key, value]) => {
            if (value === 'default' && result === undefined) {
              result = key;
            } else if (value === 'True') {
              if (key === 'excludedList') {
                result = 'excluded';
              } else if (result !== 'excluded') {
                result = key;
              }
            }
          },
        );
        // this.targetGroupID=result;
        console.log(result);
        return result;

      },
      showOverlayType: (state) =>{
        const typeArray = Object.entries(state.overlays).find(([, item]) => item);
        return typeArray ? typeArray[0] : '';
      },

      isLoggedIn: (state) => {

        return state.promoConfig.isLoggedIn !== undefined &&

          state.promoConfig.isLoggedIn !== null

          ? (state.promoConfig.isLoggedIn === true || state.promoConfig.isLoggedIn === 'True')

          : state.promoConfig.loggedIn;

      },

      isMobile: (state) => {

        return state.promoConfig.isMobile === 'True';

      },

      isNative: (state) => {

        return state.promoConfig.isNative === 'True';

      },

      langUrl: (state) => {

        const austrianLabels = ['sportingbet.com', 'bwin.com'];

        if (austrianLabels.includes(state.promoConfig.label) && state.promoConfig.language.toLowerCase() === 'de') return 'de-at';

        if (state.promoConfig.language.includes('_')) {

          const parts = state.promoConfig.language.split('_');

          return parts[0].toLowerCase();

        }

        return state.promoConfig.language.toLowerCase().startsWith('en')

          ? 'en'

          : state.promoConfig.language;

      },

    },
    actions: {
      loadPromoConfig() {
        return new Promise((resolve, reject) => {
          if (window.clientConfig.promoConfig) {
            this.promoConfig = {
              ...window.clientConfig.promoConfig,
              ...window.siteConfig,
            };
            resolve();
          } else {
            // eslint-disable-next-line
            console.error('MTT Score Predictor Terminal: window.clientConfig.promoConfig not found');
            reject();
          }
        });
      },
      loadPromoContent() {
        return new Promise((resolve, reject) => {
          debugger;
          if (window.promoContent) {
            this.promoContent = window.promoContent;
            resolve();
          } else {
            // eslint-disable-next-line
            console.error('Market Predictor ');
            reject();
          }
        });
      },
    },
  });
