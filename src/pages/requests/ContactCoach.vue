<template>
	<div>
		<section>
			<h1>Contact Coach</h1>
		</section>
		<form action="" @submit.prevent="submitForm">
			<div class="form-control">
				<label for="email">Your Email</label>
				<input type="email" id="email" v-model.trim="email" />
			</div>
			<div class="form-control">
				<label for="message">Your Message</label>
				<textarea id="message" rows="5" v-model.trim="message"></textarea>
			</div>
			<p class="errors" v-if="!formIsValid">
				Please enter a valid email address and message.
			</p>
			<div class="actions">
				<base-button type="submit">Send Message</base-button>
			</div>
		</form>
	</div>

</template>

<script>
export default {
	data() {
		return {
			email: '',
			message: '',
			formIsValid: true,
		}
	},
	methods: {
		submitForm() {
			if (!this.validateForm()) {
				return;
			}
			// Handle form submission logic here
			const contactData = {
				email: this.email,
				message: this.message,
			};
			console.log('Contact Data Submitted:', contactData);
			// You can dispatch an action or make an API call here
			this.$store.dispatch('requests/contactCoach', {
				coachId: this.$route.params.id,
				...contactData,
			});

			this.$router.replace('/coaches');
		},
		validateForm() {
			this.formIsValid = true;
			if (this.email === "" || !this.email.includes('@') || this.message === "") {
				this.formIsValid = false;
			}
			return this.formIsValid;
		},
	}
}
</script>

<style scoped>
form {
	margin: 1rem;
	border: 1px solid #ccc;
	border-radius: 12px;
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

.errors {
	font-weight: bold;
	color: red;
}

.actions {
	text-align: center;
}
</style>