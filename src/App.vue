<template>
  <div v-if="allLoaded">
    <babylons-js-scene />
  </div>
</template>

<script>
import BabylonsJsScene from './components/BabylonJsScene.vue';
import { promoWeb } from '../plugin/promoWeb';
import { mapState } from 'pinia';
export default {
  name: 'App',
  components: {
    BabylonsJsScene,
  },
  data() {
    return {
      allLoaded: false,
    };
  },
  computed: {
    ...mapState(promoWeb, ['getSCItem', 'getImages', 'isLoggedIn']),
    headerData() {
      const item = this.getSCItem('text');
      return item.FieldValues || {};
    },

  },

  async mounted() {
      //console.log('page width',window.innerWidth);
    await Promise.all([
      this.loadPromoConfig(),
      this.loadPromoContent(),
    ]);
    //  const cssVariablesItem = this.getSCItem('config').ChildItems.find(
    //   (obj) => obj.ItemName.toLowerCase() === 'css_variables',
    // );
    // createCssVars(cssVariablesItem.FieldValues.Parameters);

  //console.log('page load',this.modalDataSC);
   await this.loadPromoData();
  //console.log('page pop-up');
    this.allLoaded = true;
  // if(this.isLoggedIn)
  //  this.promoInitialVisit();
   },

  methods: {
    //...mapActions(promoWeb, ['loadPromoConfig', 'loadPromoContent']),
  },

};

</script>


<style></style>
