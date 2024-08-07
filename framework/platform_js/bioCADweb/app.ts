﻿/// <reference path="../../build/linq.d.ts" />
/// <reference path="../../build/biocad_webcore.d.ts" />

/// <reference path="WebApp/Passport/LogInScript.ts" />
/// <reference path="WebApp/Passport/RecoverScript.ts" />
/// <reference path="WebApp/Passport/RegisterScript.ts" />

const dev: Console = console;
const logo = [`%c

  .Ci     .bi           oDDDi    iDi   .CDDDDl             .Ci                     .C.
  .Ci     .bi         .bo  .c.   oCo   .Cl  .Cb.           .Ci                     .C.
  .Ci                .Co        .CiA.  .Cl    oo           .Ci                     .C.
  .CiCDDl .bi .CDDb. .A.        lo.Cl  .Cl    .A.     oDDl .Ci .CDDb. .bi  ib. .CDDcC.
  .Cb. .bi.bi.Co  ib.iC.       .Ci iC. .Cl    .C.   .CC. i..Ci.Co  ib..bi  ib..Co  ob.
  .Cl   oo.biib.   oliC.       .C. .bi .Cl    .C.   .C.    .Ciib.   ol.bi  ib..C.  .C.
  .Ci   lo.biiC.   oo.C.       lDDDDDo .Cl    .C.   iC.    .CiiC.   oo.bi  ib.iC.  .C.
  .Ci   ol.biib.   ol.Cl      .bi   ib..Cl    oo    ib.    .Ciib.   ol.bi  ib.ib.  .A.
  .Cb. ib..bi.Co  ib. iDl  .c.ib.   .bl.Cl  .CC. .bi.Co  i..Ci.Co  ib..Co .Cb..bl .Cb.
  .CibDDi .bi .CDDb.   .bDDb. oo     oC.CDDDDl   .bi .CDDl .Ci .CDDb.  .bDblb. .bDDiC.

                                                                   http://bioCAD.cloud 
                                               xieguigang <xie.guigang@gcmodeller.org>

`].concat(["color:#084B8A"]);

console.log.apply(dev, logo);

namespace bioCAD.WebApp {

    export function start() {
        Router.AddAppHandler(new LoginScript());
        Router.AddAppHandler(new RegisterScript());
        Router.AddAppHandler(new RecoverScript());

        Router.AddAppHandler(new Platform.TaskMgr());
        Router.AddAppHandler(new Platform.Report());
        Router.AddAppHandler(new Platform.FileManager());

        Router.RunApp();
    }
}

$ts.mode = Modes.debug;
$ts(bioCAD.WebApp.start);