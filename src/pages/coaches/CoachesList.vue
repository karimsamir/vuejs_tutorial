<template>
    <div>
        <base-dialog :show="!!error" title="An Error Occurred!" @close="handleError">
            <p>
                {{ error }}
            </p>
        </base-dialog>
        <section>
            <coach-filter @change-filter="setFilter"></coach-filter>
        </section>
        <section>
            <base-card>

                <div class="controls">
                    <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
                    <base-button to="/register" link v-if="!isCoach && !isLoading">
                        Register as a Coach
                    </base-button>
                </div>
                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <ul v-else-if="hasCoaches">
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
    </div>

</template>

<script>
import CoachItem from '@/components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
    components: {
        CoachItem,
        CoachFilter,
    },
    data() {
        return {
            isLoading: false,
            error: null,
            activeFilter: {
                frontend: true,
                backend: true,
                career: true,
            },
        };
    },
    computed: {
        filteredCoaches() {
            // return this.$store.getters['coaches/coaches'];
            const coaches = this.$store.getters['coaches/coaches'];
            const filters = this.activeFilter;
            return coaches.filter((coach) => {
                if (filters.frontend && coach.areas.includes('frontend')) {
                    return true;
                }
                if (filters.backend && coach.areas.includes('backend')) {
                    return true;
                }
                if (filters.career && coach.areas.includes('career')) {
                    return true;
                }
                return false;
            });
        },
        hasCoaches() {
            return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach'];
        },


    },
    created() {
        this.loadCoaches();
    },
    methods: {
        setFilter(updatedFilters) {
            console.log(updatedFilters);
            this.activeFilter = updatedFilters;
            // ...
        },
        async loadCoaches(refresh = false) {

            this.isLoading = true;

            try {
                await this.$store.dispatch('coaches/loadCoaches', { forceRefresh: refresh });

            }
            catch (error) {
                this.error = error.message || 'Failed to load coaches.';
                console.error(error);
            }
            this.isLoading = false;
        },
        handleError() {
            this.error = null;
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