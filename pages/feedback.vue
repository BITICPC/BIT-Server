<template>
  <v-container>
    <v-row justify="center">
      <v-col class="py-0">
        <v-card>
          <v-card-title>反馈</v-card-title>
          <v-card-subtitle>Feedback</v-card-subtitle>
          <v-divider />
          <v-card-text>
            <v-form ref="form" @submit.prevent="submitFeedback">
              <v-text-field
                v-model="feedback.title"
                :rules="[v => !!v || '标题不能为空']"
                filled
                label="标题"
                hint="你的问题是什么？"
              />
              <v-textarea
                v-model="feedback.content"
                :rules="[v => !!v || '内容不能为空']"
                filled
                class="mb-2"
                label="内容"
                auto-grow
              />
              <v-btn :loading="loading" color="success" type="submit">
                <v-icon left>
                  mdi-cloud-upload
                </v-icon>
                提交
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      feedback: {
        title: '',
        content: ''
      },
      loading: false
    }
  }
}
</script>
