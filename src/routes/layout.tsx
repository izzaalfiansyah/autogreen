import { Slot, component$, useStyles$ } from "@builder.io/qwik";
import styles from "./styles.css?inline";

export default component$(() => {
  useStyles$(styles);

  return (
    <div class="min-h-screen bg-gray-50 diagram">
      <div class="flex h-20 items-center justify-between bg-white shadow-sm lg:px-10 px-5">
        <div>
          <span class="font-semibold text-lg">Autogreen</span>
        </div>
      </div>
      <div class="lg:p-10 p-5">
        <Slot />
      </div>
    </div>
  );
});
