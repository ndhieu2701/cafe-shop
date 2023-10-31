import { atom } from "recoil";

const productAtom = atom({
  key: "productAtomState",
  default: [],
});

const minMaxPriceAtom = atom({
  key: "minMaxPriceAtomState",
  default: { min: 0, max: 0 },
});


export { productAtom, minMaxPriceAtom };
