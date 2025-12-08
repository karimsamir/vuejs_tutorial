<template>
    <form action="" @submit.prevent="submitForm">
        <div class="form-control" :class="{invalid: !firstName.isValid}">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" v-model.trim="firstName.val" @blur="clearValidity(firstName)" />
            <p v-if="!firstName.isValid">firstName must not be empty</p>
        </div>
        <div class="form-control" :class="{ invalid: !lastName.isValid}">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" v-model.trim="lastName.val" @blur="clearValidity(lastName)" />
            <p v-if="!lastName.isValid">lastName must not be empty</p>
        </div>
        <div class="form-control" :class="{ invalid: !description.isValid}">
            <label for="description">Description</label>
            <textarea id="description" rows="5" v-model.trim="description.val" 
                @blur="clearValidity(description)"></textarea>
            <p v-if="!description.isValid">description must not be empty</p>
        </div>
        <div class="form-control" :class="{ invalid: !rate.isValid}">
            <label for="rate">Hourly Rate (USD)</label>
            <input type="number" id="rate" v-model.number="rate.val" @blur="clearValidity(rate)" />
            <p v-if="!rate.isValid">Rate must not be empty</p>
        </div>
        <!-- <div class="form-control" :class="{invalid: !firstName.isValid}">
            <label for="areas">Areas of Expertise</label>
            <select id="areas" multiple>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="career">Career</option>
            </select>
        </div> -->
        <div class="form-control" :class="{ invalid: !areas.isValid}">
            <h3>Areas of Expertise</h3>
            <div>
                <input type="checkbox" id="frontend" value="frontend" v-model="areas.val" @blur="clearValidity(areas)"  />
                <label for="frontend">Frontend Development</label>
            </div>
            <div>
                <input type="checkbox" id="backend" value="backend" v-model="areas.val" @blur="clearValidity(areas)"  />
                <label for="backend">Backend Development</label>
            </div>
            <div>
                <input type="checkbox" id="career" value="career" v-model="areas.val" @blur="clearValidity(areas)"  />
                <label for="career">Career Advisory</label>
            </div>
            <p v-if="!areas.isValid">Areas must not be empty</p>

        </div>

        <div class="form-actions">
            <base-button type="submit">Register</base-button>
        </div>
        <p>Fix the above errors to submit the form</p>
    </form>
</template>

<script>
export default {
    emits: ['save-data'],
    data() {
        return {
            firstName: {
                val: '',
                isValid: true,
            },
            lastName: {
                val: '',
                isValid: true,
            },
            description: {
                val: '',
                isValid: true,
            },
            rate: {
                val: '',
                isValid: true,
            },
            areas: {
                val: [],
                isValid: true,
            },
            formIsValid: true,
        };
    },
    methods: {
        clearValidity(input) {
            input.isValid = true;
        },
        validateForm() {
            this.formIsValid = true;
            if (this.firstName.val === "") {
                this.firstName.isValid = false;
                this.formIsValid = false;
            } else {
                this.firstName.isValid = true;
            }
            if (this.lastName.val === "") {
                this.lastName.isValid = false;
                this.formIsValid = false;
            } else {
                this.lastName.isValid = true;
            }
            if (this.description.val === "") {
                this.description.isValid = false;
                this.formIsValid = false;
            } else {
                this.description.isValid = true;
            }
            if (this.rate.val === "" || this.rate.val <= 0) {
                this.rate.isValid = false;
                this.formIsValid = false;
            } else {
                this.rate.isValid = true;
            }
            if (this.areas.val.length === 0) {
                this.areas.isValid = false;
                this.formIsValid = false;
            } else {
                this.areas.isValid = true;
            }
            return this.formIsValid;
        },
        submitForm() {
            if (!this.validateForm()) {
                return;
            }
            // Handle form submission logic here
            const formData = {
                first: this.firstName.val,
                last: this.lastName.val,
                desc: this.description.val,
                rate: this.rate.val,
                areas: this.areas.val,
            };

            // console.log('Form Data Submitted:', formData);
            this.$emit('save-data', formData);
        }
    },
}
</script>

<style scoped>
.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
}

input[type='checkbox']+label {
    font-weight: normal;
    display: inline;
    margin: 0 0 0 0.5rem;
}

input,
textarea {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    font: inherit;
}

input:focus,
textarea:focus {
    background-color: #f0e6fd;
    outline: none;
    border-color: #3d008d;
}

input[type='checkbox'] {
    display: inline;
    width: auto;
    border: none;
}

input[type='checkbox']:focus {
    outline: #3d008d solid 1px;
}

h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
}

.invalid label {
    color: red;
}

.invalid input,
.invalid textarea {
    border: 1px solid red;
}
</style>