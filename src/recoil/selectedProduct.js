import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "selected-products",
  storage: localStorage,
  converter: JSON,
});

const selectedProducts = atom({
  key: "selectedProductAtom",
  default: [],
  effects_UNSTABLE: [persistAtom]
});

export default selectedProducts