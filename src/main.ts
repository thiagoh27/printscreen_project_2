/*
 o código está inicializando a plataforma Angular para execução no navegador e, em seguida, inicializando o módulo principal do aplicativo (definido em AppModule). Se houver algum erro durante esse processo, ele será capturado e impresso no console. 

platformBrowserDynamic(): Isso cria uma instância da plataforma Angular para a execução no navegador.

.bootstrapModule(AppModule): Este método inicia o processo de inicialização do módulo principal do aplicativo.
*/

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
