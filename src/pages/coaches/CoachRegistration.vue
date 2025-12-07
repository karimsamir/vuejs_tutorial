<template>
	<section>
		<base-card>
			<h2>Register as a Coach</h2>
			<p>Registration form goes here.</p>
			<coach-form @save-data="saveData"></coach-form>
		</base-card>
	</section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
	components: {
		CoachForm,
	},
	methods: {
		saveData(coachData) {
			console.log('Received Coach Data:', coachData);
			// const newCoach = {
			// 	id: new Date().toISOString(),
			// 	firstName: coachData.first,
			// 	lastName: coachData.last,
			// 	description: coachData.desc,
			// 	hourlyRate: coachData.rate,
			// 	areas: coachData.areas,
			// };
			this.$store.dispatch('coaches/registerCoach', coachData);
			this.$router.replace('/coaches');
		},
	},
}
</script>