import {
  ConsoleStyleText as log
} from "../mod.ts";


log.t("Hello, World!").c({ r: 255, g: 0, b: 0 }, { r: 0, g: 255, b: 0 }).log

console.log([
  log.t('-1-').c( 0x045cab,0xf45a32).s("b")._,
  log.t('-2-').c( 0xAB0495,0x32F4B3).s("b")._, 
  log.t('-3-').c( 0xABA004,0x22358A).s("b")._
].join(''));

log.t('_A_').c( 0x045cab,0xf45a32).s("b").t('_B_').c( 0xAB0495,0x32F4B3).s("b").t('_C_').c( 0xABA004,0x22358A).s("b").log


log
  .t('__--A--__',1).c( 0x045cab,0xf45a32).s("b")
  .t('__--BB--__',[2,0]).c( 0xAB0495,0x32F4B3).s("b")
  .t('__--CCC--__',[[8,2],0]).c( 0xABA004,0x22358A).s("b")
  .t('__--DDDD--__',[2,[1,4]]).c( 0xB6A2B3,0x92590E).s("b")
  .t('__--EEEEE--__').c( 0x11030F,0x38920E).s("b")
  .log



  log
  .t('A--1--B',1).c( 0x745cab,0x245a32).s("b")
  .t('A--2--B',1).c( 0xCB04A5,0xF2F4B3).s("b")
  .t('A--3--B',1).c( 0x2A3D3F,0x92590E).s("b")
  .t('A--4--B',1).c( 0x2EBB35,0x38030F).s("b")
  .log
