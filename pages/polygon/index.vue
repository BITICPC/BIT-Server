<template>
  <v-container>
    <v-row justify="center">
      <v-col class="py-0" cols="12" md="10">
        <v-card>
          <v-card-title>Welcome to BIT Online Judge Polygon!</v-card-title>
          <v-card-subtitle>BIT Online Judge Polygon is a under-developing system inspired by <a href="https://polygon.codeforces.com/">Polygon of Codeforces</a>. It also offers an answer to what Polygon is.</v-card-subtitle>
          <v-card-text>
            <v-alert color="info" prominent outlined>
              <div class="title">
                Mission of Polygon
              </div>
              <p class="mb-0">
                The mission of Polygon is to provide platform for creation of programming contest problems. Polygon supports the whole development cycle:
                <ul>
                  <li>problem statement writing</li>
                  <li>test data preparing (generators supported)</li>
                  <li>model solutions (including correct and wittingly incorrect)</li>
                  <li>judging</li>
                  <li>automatic validation</li>
                </ul>
              </p>
            </v-alert>
            <p>
              To use Polygon, you have to meet at least one of the requirements:
              <ul>
                <li>Administrator</li>
                <li><s>Be invited</s></li>
              </ul>
            </p>
            <p class="mb-0">
              <strong>NOTE: Polygon rights also gives you the access to all submissions of problems and finished regular contests, and test data preview.</strong>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'polygon'
}
</script>
