<template>
  <Modal @close="close"> </Modal>
</template>

<script>
import Modal from "@/components/app/Modal";
import { required } from "vuelidate/lib/validators";

export default {
  name: "ProductModal",
  components: {
    Modal
  },
  data: () => ({
    name: null,
    barcode: null,
    unit: null,
    partial: false,
    nameDisabled: false,
    barcodeDisabled: false,
    unitDisabled: false,
    isNew: true,
    priceRetail: null,
    priceWholesale: null,
    quantityWholesale: null,
    isPiece: null,
    piecePrice: null,
    pieceQuantity: null,
    pieceBoxActive: false
  }),
  validations: {
    name: { required },
    barcode: { required }
  },
  methods: {
    async createSupplier() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      await this.$store.dispatch("createSupplier", {
        name: this.name,
        barcode: this.barcode
      });

      this.close();
    },
    close() {
      this.name = null;
      this.phone = null;

      this.$emit("close");
    }
  }
};
</script>

<style scoped></style>
