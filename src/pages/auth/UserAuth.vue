<template>
    <div>
        <base-dialog :show="!!error" title="An error occurred..." @close="handleError">
            {{ error }}
        </base-dialog>

        <base-dialog :show="isLoading" fixed title="Authenticating...">
            <base-spinner></base-spinner>
        </base-dialog>

        <base-card>
            <form action="" @submit.prevent="submitForm">
                <div class="form-control">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model.trim="email" />
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model.trim="password" />
                </div>
                <p v-if="!formIsValid">
                    Please enter a valid email address and password (at least 6 characters).
                </p>
                <div class="form-actions">
                    <base-button>{{ submitButtonCaption }}</base-button>
                    <base-button type="button" mode="flat" @click="switchAuthMode">
                        {{ switchModeButtonCaption }}
                    </base-button>
                </div>
            </form>
        </base-card>
    </div>
</template>

<script>

export default {
    data() {
        return {
            email: '',
            password: '',
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null,
        };
    },
    methods: {
        async submitForm() {
            if (!this.validateForm()) {
                return;
            }
            this.isLoading = true;

            const authData = {
                email: this.email,
                password: this.password,
            };
            console.log('Auth Data Submitted:', authData);
            // You can dispatch an action or make an API call here
            try {
                if (this.mode === 'login') {
                    await this.$store.dispatch('login', authData);
                }
                else {
                    await this.$store.dispatch('signup', authData);
                }

            }
            catch (error) {

                this.error = error.message || 'Failed to authenticate.';
            }

            this.isLoading = false;

            // this.$router.replace('/coaches');
        },
        validateForm() {
            this.formIsValid = true;
            if (this.email === "" || !this.email.includes('@') || this.password.length < 6) {
                this.formIsValid = false;
            }
            return this.formIsValid;
        },
        switchAuthMode() {
            this.mode = this.mode === 'login' ? 'signup' : 'login';
        },
        handleError() {
            this.error = null;
        },
    },
    computed: {
        submitButtonCaption() {
            return this.mode === 'login' ? 'Login' : 'Sign Up';
        },
        switchModeButtonCaption() {
            return this.mode === 'login' ? 'Signup instead' : 'Login instead';
        },
    },
};
</script>

<style scoped>
form {
    margin: 1rem;
    padding: 1rem;
}

.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
}

input,
textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
}

input:focus,
textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
}
</style>