<template>
  <div>
    <base-dialog :show="!!error" title="An error occured !" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <h2>Register as a coach now !</h2>
        <coach-form @save-data="saveData"></coach-form>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm
  },
  data() {
    return {
      error: null,
    }
  },
  methods: {
    async saveData(data) {
      try {
        await this.$store.dispatch('coaches/registerCoach', data);
        await this.$router.replace('/coaches');
      } catch (error) {
        this.error = error.message || 'Something went wrong !';
      }
    },
    handleError() {
      this.error = null;
    }
  }
}
</script>

<style scoped>

</style>