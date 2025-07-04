<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import DatePicker from '~/components/datePicker.vue';
import { newBudgetSchemaForm } from '~/utils/budgetSchemas';
import { CalendarDate } from '@internationalized/date';
import { computed } from 'vue';

const isOpen = defineModel<boolean>('modelValue', { required: true });
const { createBudget } = useMyBudgetStoreStore();
const formSchema = toTypedSchema(newBudgetSchemaForm);

const form = useForm({
  validationSchema: formSchema,
});

const isFormValid = computed(() => {
  return Object.keys(form.errors.value).length === 0 && form.meta.value.touched;
});


// Calculate max date (10 years from today)
const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() + 10);

// Convert JavaScript Date to CalendarDate
const maxCalendarDate = new CalendarDate(
  maxDate.getFullYear(),
  maxDate.getMonth() + 1, // Month is 0-indexed in JS Date, 1-indexed in CalendarDate
  maxDate.getDate()
);

const onSubmit = form.handleSubmit(async (values) => {
  isOpen.value = false;
  createBudget(values);
});

// Only allow numeric input with decimals
const onNumberInput = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const value = input.value.replace(/[^0-9.]/g, '');
  
  // Handle decimal points
  const parts = value.split('.');
  if (parts.length > 1) {
    // Keep only first decimal point and limit to 2 decimal places
    input.value = `${parts[0]}.${parts.slice(1).join('').substring(0, 2)}`;
  } else {
    input.value = value;
  }
  
  // Trigger validation update
  input.dispatchEvent(new Event('change', { bubbles: true }));
};
</script>

<template>
  <Dialog :open="isOpen" @update:open="isOpen = $event">
    <DialogContent class="sm:max-w-md">
      <DialogHeader class="pb-4">
        <DialogTitle class="text-2xl font-bold">Create a New Budget</DialogTitle>
      </DialogHeader>
      <form class="flex flex-col gap-6 " @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem class="flex flex-col gap-4">
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" placeholder="Budget name" />
            </FormControl>
            <div class="min-h-[20px] block">
              <FormMessage />
            </div>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Tell us a little bit about the budget" class="resize-none"
                v-bind="componentField" />
            </FormControl>
            <div class="min-h-[20px] block">
              <FormMessage />
            </div>
          </FormItem>
        </FormField>

       <div class="flex gap-4 items-center justify-center">
        <FormField v-slot="{ componentField }" name="startingBudget">
          <FormItem class="flex flex-col items-center justify-center">
            <FormLabel>Starting Budget</FormLabel>
            <FormControl>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input type="text" inputmode="decimal" @input="onNumberInput" v-bind="componentField" class="pl-7"
                  placeholder="1000.00" />
              </div>
            </FormControl>
            <div class="min-h-[20px] w-full block">
              <FormMessage />
            </div>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="maxExpensesPerDay">
          <FormItem class="flex flex-col items-center justify-center">
            <FormLabel>Daily Budget</FormLabel>
            <FormControl>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input type="text" inputmode="decimal" @input="onNumberInput" v-bind="componentField" class="pl-7"
                  placeholder="100.00" />
              </div>
            </FormControl>
            <div class="min-h-[20px] w-full block">
              <FormMessage />
            </div>
          </FormItem>
        </FormField>
       </div>

        <DatePicker v-model="form.values.startDate" name="startDate" label="Start Date"
          description="This is the start date of the budget." :maxValue="maxCalendarDate" />
      </form>

      <DialogFooter>
        <Button type="submit" @click="onSubmit" :disabled="!isFormValid">
          Submit
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>