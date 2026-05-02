// Stylized India map — hand-coded simplified state regions arranged geographically.
// Not topologically accurate; designed as an aesthetic interactive map.

import type { Region } from "./states";

export interface MapState {
  id: string;
  name: string;
  region: Region;
  // SVG path on a 600x700 viewBox
  d: string;
  // text label position
  cx: number;
  cy: number;
  // Has detailed data?
  hasDetail?: boolean;
}

// Each path is a rough polygon roughly representing the state's shape/position.
export const MAP_STATES: MapState[] = [
  // NORTH
  {
    id: "JK",
    name: "Jammu & Kashmir",
    region: "north",
    d: "M180,50 L260,40 L300,80 L290,130 L240,140 L195,115 Z",
    cx: 240,
    cy: 90,
  },
  {
    id: "HP",
    name: "Himachal Pradesh",
    region: "north",
    d: "M240,140 L290,130 L320,160 L295,190 L235,180 Z",
    cx: 270,
    cy: 165,
  },
  {
    id: "PB",
    name: "Punjab",
    region: "north",
    d: "M195,180 L235,180 L245,220 L210,240 L180,215 Z",
    cx: 210,
    cy: 210,
    hasDetail: true,
  },
  {
    id: "UK",
    name: "Uttarakhand",
    region: "north",
    d: "M295,190 L350,200 L355,235 L310,240 L285,215 Z",
    cx: 320,
    cy: 215,
  },
  {
    id: "HR",
    name: "Haryana",
    region: "north",
    d: "M210,240 L280,235 L285,275 L225,285 Z",
    cx: 245,
    cy: 260,
  },
  {
    id: "DL",
    name: "Delhi",
    region: "north",
    d: "M255,260 L275,258 L278,275 L260,278 Z",
    cx: 267,
    cy: 268,
  },
  {
    id: "RJ",
    name: "Rajasthan",
    region: "west",
    d: "M120,260 L225,285 L240,360 L180,420 L100,395 L80,330 Z",
    cx: 165,
    cy: 340,
    hasDetail: true,
  },
  {
    id: "UP",
    name: "Uttar Pradesh",
    region: "north",
    d: "M285,275 L420,265 L445,330 L380,365 L290,355 L255,310 Z",
    cx: 350,
    cy: 315,
  },
  {
    id: "BR",
    name: "Bihar",
    region: "east",
    d: "M420,310 L495,300 L505,355 L440,365 Z",
    cx: 465,
    cy: 335,
  },
  {
    id: "SK",
    name: "Sikkim",
    region: "northeast",
    d: "M495,290 L520,285 L525,310 L500,313 Z",
    cx: 510,
    cy: 300,
  },
  // NORTHEAST
  {
    id: "AS",
    name: "Assam",
    region: "northeast",
    d: "M530,300 L590,295 L595,340 L535,345 Z",
    cx: 562,
    cy: 320,
  },
  {
    id: "AR",
    name: "Arunachal Pradesh",
    region: "northeast",
    d: "M540,260 L600,255 L605,295 L545,298 Z",
    cx: 572,
    cy: 278,
  },
  {
    id: "NL",
    name: "Nagaland",
    region: "northeast",
    d: "M590,310 L615,308 L617,340 L595,342 Z",
    cx: 603,
    cy: 325,
  },
  {
    id: "MN",
    name: "Manipur",
    region: "northeast",
    d: "M590,345 L615,343 L617,375 L595,378 Z",
    cx: 603,
    cy: 360,
  },
  {
    id: "MZ",
    name: "Mizoram",
    region: "northeast",
    d: "M580,380 L605,378 L607,410 L585,412 Z",
    cx: 593,
    cy: 395,
  },
  {
    id: "TR",
    name: "Tripura",
    region: "northeast",
    d: "M555,360 L580,358 L582,385 L558,388 Z",
    cx: 568,
    cy: 373,
  },
  {
    id: "ML",
    name: "Meghalaya",
    region: "northeast",
    d: "M510,345 L575,342 L578,370 L515,372 Z",
    cx: 543,
    cy: 357,
  },
  // EAST
  {
    id: "WB",
    name: "West Bengal",
    region: "east",
    d: "M460,365 L515,360 L510,440 L470,460 L450,420 Z",
    cx: 480,
    cy: 405,
    hasDetail: true,
  },
  {
    id: "JH",
    name: "Jharkhand",
    region: "east",
    d: "M380,365 L450,365 L455,415 L390,420 Z",
    cx: 415,
    cy: 390,
  },
  {
    id: "OD",
    name: "Odisha",
    region: "east",
    d: "M380,420 L460,420 L465,490 L390,495 L370,460 Z",
    cx: 415,
    cy: 460,
  },
  // CENTRAL
  {
    id: "MP",
    name: "Madhya Pradesh",
    region: "central",
    d: "M180,420 L380,400 L390,470 L300,485 L210,480 Z",
    cx: 290,
    cy: 445,
  },
  {
    id: "CG",
    name: "Chhattisgarh",
    region: "central",
    d: "M340,470 L405,470 L410,530 L350,535 Z",
    cx: 375,
    cy: 500,
  },
  // WEST
  {
    id: "GJ",
    name: "Gujarat",
    region: "west",
    d: "M60,395 L180,420 L210,480 L160,520 L100,500 L70,450 Z",
    cx: 130,
    cy: 460,
  },
  {
    id: "MH",
    name: "Maharashtra",
    region: "west",
    d: "M120,495 L340,475 L355,565 L290,580 L180,575 L130,540 Z",
    cx: 230,
    cy: 530,
  },
  {
    id: "GA",
    name: "Goa",
    region: "west",
    d: "M170,580 L195,578 L200,605 L175,608 Z",
    cx: 185,
    cy: 595,
  },
  // SOUTH
  {
    id: "TG",
    name: "Telangana",
    region: "south",
    d: "M260,565 L340,560 L345,610 L275,615 Z",
    cx: 305,
    cy: 588,
  },
  {
    id: "AP",
    name: "Andhra Pradesh",
    region: "south",
    d: "M260,615 L380,605 L385,675 L290,680 L260,650 Z",
    cx: 325,
    cy: 645,
  },
  {
    id: "KA",
    name: "Karnataka",
    region: "south",
    d: "M180,580 L275,580 L290,680 L240,705 L180,690 L165,630 Z",
    cx: 225,
    cy: 640,
  },
  {
    id: "KL",
    name: "Kerala",
    region: "south",
    d: "M195,690 L235,705 L235,760 L210,790 L185,755 Z",
    cx: 210,
    cy: 740,
    hasDetail: true,
  },
  {
    id: "TN",
    name: "Tamil Nadu",
    region: "south",
    d: "M240,705 L295,690 L320,755 L290,800 L235,795 L230,755 Z",
    cx: 275,
    cy: 745,
    hasDetail: true,
  },
];
