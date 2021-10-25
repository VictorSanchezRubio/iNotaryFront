import { routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from "@angular/forms";

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntryComponent } from './entry/entry/entry.component';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './wpx/home/home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent, DialogNewProtocol } from './wpx/home/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';

import { SearchComponent } from './wpx/files/search/search.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FueraprotocoloComponent } from './wpx/invoices/fueraprotocolo/fueraprotocolo.component';

import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

import { MatCheckboxModule } from '@angular/Material/checkbox';
import { MatSelectModule } from '@angular/material/select';

import { MatDatepickerModule } from '@angular/material/datepicker';
// import { AppDateAdapter, APP_DATE_FORMATS } from './configurations/format-datepicker';
import { MatRippleModule, MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';


import { TabsDirective } from './directives/tabs.directive';
import { CarpetaComponent } from './wpx/carpeta/carpeta/carpeta.component';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatTooltipModule } from '@angular/material/tooltip';
import { TruncateStringPipe } from './pipe/truncate-string.pipe';
import { TooltipDividePipe } from './pipe/tooltip-divide.pipe';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ExportsComponent } from './wpx/helper/exports/exports.component';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { MatDialogModule } from '@angular/material/dialog';
import { ErrorInterceptorInterceptor } from './interceptor/error-interceptor.interceptor';
import { JwtInterceptorInterceptor } from './interceptor/jwt-interceptor.interceptor';
import { AuthGuard } from './guards/authGuards';
import { DatosGeneralesComponent } from './wpx/carpeta/carpeta/screens/datos-generales/datos-generales.component';
import { SnackBarComponent } from './wpx/helper/snack-bar/snack-bar.component';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ActosComponent, addConcepto, ChangeLabelDialog } from './wpx/carpeta/carpeta/screens/actos/actos.component';
import { ChangeLabelDialogConcepto, DelConcepto, TreeProcedureComponent } from './wpx/carpeta/carpeta/screens/tree-procedure/tree-procedure.component'; 

import { EditorModule } from '@tinymce/tinymce-angular';
import { WordComponent } from './wpx/word/word/word.component';
import { IvaRetPipe } from './pipe/iva-ret.pipe';

import {CdkAccordionModule} from '@angular/cdk/accordion'; 

import {MatDividerModule} from '@angular/material/divider';
import { ClasesComparecienciaComponent } from './wpx/carpeta/carpeta/screens/tree-procedure/tree/clases-compareciencia/clases-compareciencia.component';
import { SignoComponent } from './wpx/carpeta/carpeta/screens/tree-procedure/tree/signo/signo.component';
import { ObjetosComponent } from './wpx/carpeta/carpeta/screens/tree-procedure/tree/objetos/objetos.component';
import { SignoCarpetaComponent } from './wpx/carpeta/carpeta/screens/actos/signo-carpeta/signo-carpeta.component';
import { ComparecientesComponent, SearchGlobalComparecientes, SearchSujeto } from './wpx/carpeta/carpeta/screens/comparecientes/comparecientes.component';

import {DragDropModule} from '@angular/cdk/drag-drop'; 
import { ShareServiceService } from './services/share-service.service';
import { SujetosComponent } from './wpx/helper/sujetos/sujetos.component';
import { SignoProcedureComponent } from './wpx/carpeta/carpeta/screens/signo-procedure/signo-procedure.component';
import { CalendarComponent } from './wpx/calendar/calendar.component';

import { FullCalendarModule } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridWeek from '@fullcalendar/timegrid'; 
import bootstrapPlugin from '@fullcalendar/bootstrap';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { SearchGlobalComponent } from './wpx/helper/search-global/search-global.component'; // a plugin!

import { ChartsModule } from 'ng2-charts';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

import 'moment/locale/es';
import { DashboardComponent } from './wpx/clientarea/admin/chart/dashboard/dashboard.component';
import { ReportsComponent } from './wpx/clientarea/admin/chart/reports/reports.component';
import { MyNumericValuesPipe } from './pipe/my-numeric-values.pipe';
import { MyFilteronceptosPipe } from './pipe/my-filteronceptos.pipe';
import { FichacontableComponent } from './wpx/contabilidad/fichacontable/fichacontable.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridWeek,
  bootstrapPlugin,
  interactionPlugin,
  listPlugin
]);


const dbConfig: DBConfig = {
  name: "WpxDB",
  version: 1,
  objectStoresMeta: [
    {
      store: 'tipoidentificacion',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'tipoID_CODIGO', keypath: 'tipoID_CODIGO', options: { unique: false } },
        { name: 'tipoID_DESCRIPCION', keypath: 'tipoID_DESCRIPCION', options: { unique: false } },
        { name: 'tipoID_TIPOPERSONA', keypath: 'tipoID_TIPOPERSONA', options: { unique: false } }
      ]

    },

    {
      store: 'conceptosintervencion',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'CODIGOCONCEPTODEINT', keypath: 'CODIGOCONCEPTODEINT', options: { unique: false } },
        { name: 'DESCRIPCIONCONCEPTODEINT', keypath: 'DESCRIPCIONCONCEPTODEINT', options: { unique: false } },
        { name: 'CODIGOINDICEDISCO', keypath: 'CODIGOINDICEDISCO', options: { unique: false } }
      ]

    },

    {
      store: 'nacionalidad',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'CODIGO', keypath: 'CODIGO', options: { unique: false } },
        { name: 'DESCRIPCION', keypath: 'DESCRIPCION', options: { unique: false } }
      ]

    },

    {
      store: 'profesion',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'profesion_CODIGO', keypath: 'profesion_CODIGO', options: { unique: false } },
        { name: 'profesion_DESCRIPCION', keypath: 'profesion_DESCRIPCION', options: { unique: false } }
      ]

    },

    {
      store: 'regimeneconomico',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'CODIGOREGIMENECONOMICO', keypath: 'CODIGOREGIMENECONOMICO', options: { unique: false } },
        { name: 'DESCRIPCIONREGIMENECONOMICO', keypath: 'DESCRIPCIONREGIMENECONOMICO', options: { unique: false } },
        { name: 'IDIOMA', keypath: 'IDIOMA', options: { unique: false } }
      ]

    },

    {
      store: 'sexo',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'CODIGOSEXO', keypath: 'CODIGOSEXO', options: { unique: false } },
        { name: 'DESCRIPCIONSEXO', keypath: 'DESCRIPCIONSEXO', options: { unique: false } }
      ]

    },

    {
      store: 'estadocivil',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'CODIGOESTADOCIVIL', keypath: 'CODIGOESTADOCIVIL', options: { unique: false } },
        { name: 'DESCRIPCIONESTADOCIVIL', keypath: 'DESCRIPCIONESTADOCIVIL', options: { unique: false } },
        { name: 'IDIOMA', keypath: 'IDIOMA', options: { unique: false } }
      ]

    },

    {
      store: 'paises',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'CODIGO', keypath: 'CODIGO', options: { unique: false } },
        { name: 'DESCRIPCION', keypath: 'DESCRIPCION', options: { unique: false } }
      ]

    },

    {
      store: 'tipointervencion',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'claseint_CODIGO', keypath: 'claseint_CODIGO', options: { unique: false } },
        { name: 'claseint_DESCRIPCION', keypath: 'claseint_DESCRIPCION', options: { unique: false } }
      ]

    },

    {
      store: 'tipocomparecencia',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'tipocomp_CODIGO', keypath: 'tipocomp_CODIGO', options: { unique: false } },
        { name: 'tipocomp_DESCRIPCION', keypath: 'tipocomp_DESCRIPCION', options: { unique: false } }
      ]

    },

    {
      store: 'presenciarepresentacion',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'prerep_CODIGO', keypath: 'prerep_CODIGO', options: { unique: false } },
        { name: 'prerep_DESCRIPCION', keypath: 'prerep_DESCRIPCION', options: { unique: false } }
      ]

    },

    {
      store: 'clasesintervencion',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: false } },
        { name: 'descripcion', keypath: 'descripcion', options: { unique: false } }
      ]

    },


    {
      store: 'grupoactividadesPF',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'GR_CODIGO2', keypath: 'GR_CODIGO2', options: { unique: false } },
        { name: 'DESCRIPCION', keypath: 'DESCRIPCION', options: { unique: false } }
      ]

    },


    {
      store: 'grupoactividadesPJ',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'GR_CODIGO2', keypath: 'GR_CODIGO2', options: { unique: false } },
        { name: 'DESCRIPCION', keypath: 'DESCRIPCION', options: { unique: false } }
      ]

    },


    {
      store: 'cfgConfiguracion',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'configuracion_FECHA', keypath: 'configuracion_FECHA', options: { unique: false } },
        { name: 'configuracion_FOLIOS', keypath: 'configuracion_FOLIOS', options: { unique: false } },
        { name: 'configuracion_FOLIOSEXENTOS', keypath: 'configuracion_FOLIOSEXENTOS', options: { unique: false } },
        { name: 'configuracion_FOLIOSCOPIAS', keypath: 'configuracion_FOLIOSCOPIAS', options: { unique: false } },
        { name: 'configuracion_CARASVACIAS', keypath: 'configuracion_CARASVACIAS', options: { unique: false } },
        { name: 'configuracion_COPIASAUTORIZADAS', keypath: 'configuracion_COPIASAUTORIZADAS', options: { unique: false } },
        { name: 'configuracion_COPIASSIMPLES', keypath: 'configuracion_COPIASSIMPLES', options: { unique: false } },
        { name: 'CONFIGURACION_FOLIOSCOPIASPARCIALES', keypath: 'CONFIGURACION_FOLIOSCOPIASPARCIALES', options: { unique: false } },
        { name: 'configuracion_PORCENTAJEIVA', keypath: 'configuracion_PORCENTAJEIVA', options: { unique: false } },
        { name: 'configuracion_PORCENTAJERETENCION', keypath: 'configuracion_PORCENTAJERETENCION', options: { unique: false } },
        { name: 'configuracion_MODELO140', keypath: 'configuracion_MODELO140', options: { unique: false } },
        { name: 'cfg_CUENTACOBRO', keypath: 'cfg_CUENTACOBRO', options: { unique: false } }
      ]

    },

    {
      store: 'tipofinca',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'tipofinca_CODIGO', keypath: 'tipofinca_CODIGO', options: { unique: false } },
        { name: 'tipofinca_DESCRIPCION', keypath: 'tipofinca_DESCRIPCION', options: { unique: false } }
      ]

    },

    {
      store: 'clasealteracioncatastral',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'codificacionesgenericas_CODIGO', keypath: 'codificacionesgenericas_CODIGO', options: { unique: false } },
        { name: 'codificacionesgenericas_DESCRIPCION', keypath: 'codificacionesgenericas_DESCRIPCION', options: { unique: false } }
      ]

    },


    {
      store: 'cumplimientoart50',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'codificacionesgenericas_CODIGO', keypath: 'codificacionesgenericas_CODIGO', options: { unique: false } },
        { name: 'codificacionesgenericas_DESCRIPCION', keypath: 'codificacionesgenericas_DESCRIPCION', options: { unique: false } }
      ]

    },

    {
      store: 'entidadtasadora',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'CODIGOENTIDAD', keypath: 'CODIGOENTIDAD', options: { unique: false } },
        { name: 'DESCRIPCIONENTIDAD', keypath: 'DESCRIPCIONENTIDAD', options: { unique: false } }
      ]

    },

    {
      store: 'opcionesusuario',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'opc_CODIGO', keypath: 'opc_CODIGO', options: { unique: false } },
        { name: 'opc_VALOR', keypath: 'opc_VALOR', options: { unique: false } },
        { name: 'opc_TIPO', keypath: 'opc_TIPO', options: { unique: false } }
      ]

    },

    {
      store: 'turnos',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'CODIGOTURNO', keypath: 'CODIGOTURNO', options: { unique: false } },
        { name: 'DESCRIPCIONTURNO', keypath: 'DESCRIPCIONTURNO', options: { unique: false } }
      ]

    },

    {
      store: 'idiomas',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'CODIGOIDIOMA', keypath: 'CODIGOIDIOMA', options: { unique: false } },
        { name: 'DESCRIPCIONIDIOMA', keypath: 'DESCRIPCIONIDIOMA', options: { unique: false } }
      ]

    },

  ]

};


const ENTRYCOMPONETS = [
  SearchComponent,
  FueraprotocoloComponent


];


@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    HomeComponent,
    HeaderComponent,
    SearchComponent,
    FueraprotocoloComponent,
    // ENTRYCOMPONETS,
    TabsDirective,
    CarpetaComponent,
    TruncateStringPipe,
    TooltipDividePipe,
    ExportsComponent,
    DialogNewProtocol,
    DatosGeneralesComponent,
    SnackBarComponent,
    ActosComponent,
    TreeProcedureComponent,
    WordComponent,
    IvaRetPipe,
    ChangeLabelDialog,
    addConcepto,
    ClasesComparecienciaComponent,
    SignoComponent,
    ObjetosComponent,
    SignoCarpetaComponent,
    DelConcepto,
    ChangeLabelDialogConcepto,
    ComparecientesComponent,
    SujetosComponent,
    SearchSujeto,
    SignoProcedureComponent,
    CalendarComponent,
    SearchGlobalComponent,
    SearchGlobalComparecientes,
    DashboardComponent,
    ReportsComponent,
    MyNumericValuesPipe,
    MyFilteronceptosPipe,
    FichacontableComponent,


    

  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    // AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatSelectModule,

    MatRadioModule,
    MatTableModule,
    MatSortModule,

    MatDatepickerModule,
    MatRippleModule,
    MatNativeDateModule,
    MatInputModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDialogModule,

    MatSnackBarModule,


    NgxIndexedDBModule.forRoot(dbConfig),
    EditorModule,
    CdkAccordionModule,
    MatDividerModule,
    DragDropModule,
    FullCalendarModule,
ChartsModule,
   

    
    
  ],
  exports: [
    MatToolbarModule,
 

  ],
  providers: [
    { 
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, 
      useValue: { 
        appearance: 'fill' 
      } 
    },
/*
    {
      provide: MAT_DATE_LOCALE,
      useValue: "es-ES"
    },
*/
/*
    { 
      provide: DateAdapter, 
      useClass: AppDateAdapter
    },
    
    { 
      provide: MAT_DATE_FORMATS, 
      useValue: APP_DATE_FORMATS
      
    },
  */  
    {
      provide: MAT_DATE_LOCALE, 
      useValue: 'es-ES'
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS, 
      useValue: MAT_MOMENT_DATE_FORMATS
    },
  
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorInterceptor,
      multi: true
    },
    AuthGuard,
    ShareServiceService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ENTRYCOMPONETS]
})


export class AppModule {

  constructor(matIconRegistry: MatIconRegistry, sanitzer: DomSanitizer) {

    matIconRegistry.addSvgIcon('pdf_file', sanitzer.bypassSecurityTrustResourceUrl('assets/images/svg/file_type_pdf.svg'));
    matIconRegistry.addSvgIcon('csv_file', sanitzer.bypassSecurityTrustResourceUrl('assets/images/svg/file_type_csv.svg'));
    matIconRegistry.addSvgIcon('docx_file', sanitzer.bypassSecurityTrustResourceUrl('assets/images/svg/file_type_word.svg'));
    matIconRegistry.addSvgIcon('xlsx_file', sanitzer.bypassSecurityTrustResourceUrl('assets/images/svg/file_type_excel.svg'));
    matIconRegistry.addSvgIcon('odt_file', sanitzer.bypassSecurityTrustResourceUrl('assets/images/svg/file_type_odt.svg'));

    matIconRegistry.addSvgIcon('save', sanitzer.bypassSecurityTrustResourceUrl('assets/images/svg/save_icon.svg'));
    matIconRegistry.addSvgIcon('dg', sanitzer.bypassSecurityTrustResourceUrl('assets/images/svg/attach_clip_1.svg'));

    matIconRegistry.addSvgIcon('addUser', sanitzer.bypassSecurityTrustResourceUrl('assets/images/svg/add-User.svg'));
    matIconRegistry.addSvgIcon('check', sanitzer.bypassSecurityTrustResourceUrl('assets/images/svg/check.svg'));
    matIconRegistry.addSvgIcon('close', sanitzer.bypassSecurityTrustResourceUrl('assets/images/svg/close.svg'));

  }

}