<template>
  <UContainer :ui="{ constrained: 'max-w-xl xl:w-6/12 sm:w-full' }">
    <UForm
      ref="form"
      :schema="aiQuerySchema"
      :state="state"
      class="space-y-4 w-full"
      @submit="onSubmit"
    >
      <UFormGroup label="Запрос" name="query" size="lg" required>
        <UInput v-model="state.query" />
      </UFormGroup>

      <UButton type="submit" :loading="isLoading">Отправить</UButton>
    </UForm>
    <UCard v-if="messageResponse" class="mt-8 max-w-xl">{{
      messageResponse
    }}</UCard>
  </UContainer>
</template>

<script setup lang="ts">
import { aiQuerySchema } from "~/models/aiQuerySchema";

import type { FormSubmitEvent, FormError } from "#ui/types";
import { z } from "zod";

const state = reactive({
  query: undefined,
});
type Schema = z.output<typeof aiQuerySchema>;

const form = ref();
const isLoading = ref(false);
const messageResponse = ref("");

const clearMessageResponse = () => {
  messageResponse.value = "";
};

async function onSubmit(event: FormSubmitEvent<Schema>) {
  form.value.clear();
  clearMessageResponse();
  isLoading.value = true;
  const response = await sendQuery(event.data.query);
  if (response) {
    messageResponse.value = response.message;
  }
  isLoading.value = false;
}

const sendQuery = (query: Schema["query"]) => {
  return $fetch("/api/ai/send-query", {
    method: "POST",
    body: { query },
  }).catch(error => {
    const errors: FormError[] = error.data?.data?.map((err: any) => ({
      path: err.path[0],
      message: err.message,
    }));
    if (!errors) return;
    form.value.setErrors(errors);
  });
};
</script>

<style module></style>
