<template>
    <section>
        Filter Coaches!
    </section>
    <section>
        <base-card>

            <div class="controls">
                <base-button mode="outline">Refresh</base-button>
                <base-button to="/register" link>Register as a Coach</base-button>
                <router-link to="/register">Register as a Coach</router-link>
            </div>
            <ul v-if="hasCoaches">
                <!-- <li v-for="coach in filteredCoaches" :key="coach.id">
                <h2>{{ coach.firstName }} {{ coach.lastName }}</h2>
                <p>{{ coach.description }}</p>sss
                <p>Hourly Rate: ${{ coach.hourlyRate }}</p>
                <router-link :to="`/coaches/${coach.id}`">View Details</router-link>
            </li> -->
                <coach-item v-for="coach in filteredCoaches" :key="coach.id" :id="coach.id"
                    :first-name="coach.firstName" :last-name="coach.lastName" :description="coach.description"
                    :rate="coach.hourlyRate" :areas="coach.areas">
                </coach-item>

            </ul>
            <h3 v-else>No coaches found. Maybe you should be the first one!</h3>
        </base-card>
    </section>
</template>

<script>
import CoachItem from '@/components/coaches/CoachItem.vue';

export default {
    components: {
        CoachItem,
    },
    methods: {

    },
    computed: {
        filteredCoaches() {
            return this.$store.getters['coaches/coaches'];
        },
        hasCoaches() {
            return this.$store.getters['coaches/hasCoaches'];
        },

    },
}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
}
</style>