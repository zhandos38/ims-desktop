<template>
    <Modal @close="close">
        <h2>Создание поставщика</h2>
        <br>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group" :class="{ 'has-error': $v.name.$dirty && !$v.name.required }">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Введите наименование"
                        v-model="name"
                    />
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group" :class="{ 'has-error': $v.phone.$dirty && !$v.name.required }">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Введите номер телефона"
                        v-model="phone"
                        v-mask="'7(###)###-##-##'"
                    />
                </div>
            </div>
            <div class="col-md-12">
                <button
                    class="btn btn-success"
                    @click="createSupplier"
                    data-target="tooltip"
                    title="Создать поставщика"
                >
                    Создать поставщика
                </button>
            </div>
        </div>
    </Modal>
</template>

<script>
    import Modal from '@/components/app/Modal';
    import { required } from "vuelidate/lib/validators";

    export default {
        name: "SupplierModal",
        components: {
            Modal
        },
        data: () => ({
            name: null,
            phone: null,
        }),
        validations: {
            name: { required },
            phone: { required }
        },
        methods: {
            async createSupplier() {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }

                await this.$store.dispatch('createSupplier', {name: this.name, phone: this.phone});


                this.close();
            },
            close() {
                this.name = null;
                this.phone = null;

                this.$emit('close');
            }
        }
    }
</script>

<style scoped>

</style>