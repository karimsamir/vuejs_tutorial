<template>
	<section>
		<base-card>
			<h2>Register as a Coach</h2>
			<p>Registration form goes here.</p>
			<coach-form></coach-form>
		</base-card>
	</section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
	components: {
		CoachForm,
	},
	
}
</script>