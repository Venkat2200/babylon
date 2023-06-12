# Starter Project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Development

1. Fork this project  
2. Clone the project to your local  
3. Install all dependencies by running in Terminal: *npm i*  
4. Update name of the project in *package.json:*  
5. Update path where the project should be deployed (file *deploy.sh*)  
6. Check code in store > index.js and update it based on the requirements  
7. Copy page in SC to a new location: [http://cms.prod.env.works/sitecore/DirectLink.aspx?fo={C50782D2-074F-458C-AC7B-B7CD2A66C452}&la=](http://cms.prod.env.works/sitecore/DirectLink.aspx?fo={C50782D2-074F-458C-AC7B-B7CD2A66C452}&la=) and update references of bundles  
8. Run in Terminal: *npm run dev* and preview the new page with *dev=true* as query parameter  
## SiteCore setup

### Content area
```
<div id="promo-app"></div>
```
### HtmlHead area
```
<link rel="preload" href="https://mk2.itsfogo.com/sites/promo/test/main.css" as="mtt_style">  
<link rel="preload" href="https://mk2.itsfogo.com/sites/promo/test/main.js" as="mtt_script">  
<link data-content-filter="NOT QueryString.Get('dev')='true'" rel="stylesheet" href="https://mk2.itsfogo.com/sites/promo/test/main.css">  
  
<script>  
window.siteConfig = {  
  label: '${core:domain}',  
  language: '${core:sclang}',  
  isMobile: '_|Device.IsMobile|_',  
  isNative: '_|NativeApplication.IsNative|_'  
}  
</script>  
```
### ScriptFooter area
```
<script data-content-filter="QueryString.Get('dev')='true'">  
  const msBundleScript = document.createElement("script");  
  msBundleScript.type = "module";  
  msBundleScript.src = "https://localhost:5173/src/main.js";  
  document.body.appendChild(msBundleScript);  
</script>  
  
<script data-content-filter="NOT QueryString.Get('dev')='true'" type="module" src="https://mk2.itsfogo.com/sites/promo/test/main.js"></script>  
<script>  
  window.postMessage({ type: 'MTT_RESET_APP' }, '*');  
</script>  
```

### PageLayoutSettings
Select from dropdown: *PageSettings/PromoContentDepth3*