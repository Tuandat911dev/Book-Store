<script setup lang="ts">
import BaseTitle from '@/components/common/BaseTitle.vue'
import { computed, ref } from 'vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseTextArea from '@/components/common/BaseTextArea.vue'
import type { Input as FieldInput } from '@/types'
import { useCategoryStore } from '@/stores/CategoryStore.ts'
import { useAuthorStore } from '@/stores/AuthorStore.ts'
import BaseSelectBox from '@/components/common/BaseSelectBox.vue'
import { useRouter } from 'vue-router'
import { addBookAPI } from '@/apis/BookAPI.ts'
import { useNotificationStore } from '@/stores/NotificationStore.ts'

const title = 'Add New Product'
const categoryStore = useCategoryStore()
const authorStore = useAuthorStore()
const notificationStore = useNotificationStore()
const router = useRouter()
const name = ref('')
const price = ref(0)
const priceEntry = ref(0)
const avatar = ref('')
const quantity = ref(0)
const longDescription = ref('')
const sortDescription = ref('')
const publishYear = ref(0)
const size = ref(0)
const soldQuantity = ref(0)
const pageCount = ref(0)
const barcode = ref(0)
const homeOrder = ref(0)

const nameError = ref('')
const priceError = ref('')
const priceEntryError = ref('')
const avatarError = ref('')
const quantityError = ref('')
const longDescriptionError = ref('')
const sortDescriptionError = ref('')
const publishYearError = ref('')
const sizeError = ref('')
const soldQuantityError = ref('')
const pageCountError = ref('')
const barcodeError = ref('')
const homeOrderError = ref('')

const validateForm = () => {
  let isValid = true

  nameError.value = ''
  priceError.value = ''
  priceEntryError.value = ''
  avatarError.value = ''
  quantityError.value = ''
  longDescriptionError.value = ''
  sortDescriptionError.value = ''
  publishYearError.value = ''
  sizeError.value = ''
  soldQuantityError.value = ''
  pageCountError.value = ''
  barcodeError.value = ''
  homeOrderError.value = ''

  if (name.value.trim().length === 0) {
    nameError.value = 'Name is required'
    isValid = false
  }

  if (price.value <= 0 || isNaN(Number(price.value))) {
    priceError.value = 'Price must be a positive number'
    isValid = false
  }

  if (priceEntry.value <= 0 || isNaN(Number(priceEntry.value))) {
    priceEntryError.value = 'Entry price must be a positive number'
    isValid = false
  }

  if (avatar.value.trim().length === 0) {
    avatarError.value = 'Avatar URL is required'
    isValid = false
  } else if (!/^https?:\/\/.+\..+/.test(avatar.value)) {
    avatarError.value = 'Invalid URL format'
    isValid = false
  }

  if (quantity.value < 0 || isNaN(Number(quantity.value))) {
    quantityError.value = 'Quantity must be a non-negative number'
    isValid = false
  }

  if (longDescription.value.trim().length < 20) {
    longDescriptionError.value = 'Long description must be at least 20 characters'
    isValid = false
  }

  if (sortDescription.value.trim().length < 10) {
    sortDescriptionError.value = 'Short description must be at least 10 characters'
    isValid = false
  }

  if (
    publishYear.value < 1900 ||
    publishYear.value > new Date().getFullYear() ||
    isNaN(Number(publishYear.value))
  ) {
    publishYearError.value = 'Publish year must be a valid year'
    isValid = false
  }

  if (size.value <= 0 || isNaN(Number(size.value))) {
    sizeError.value = 'Size must be a positive number'
    isValid = false
  }

  if (soldQuantity.value < 0 || isNaN(Number(soldQuantity.value))) {
    soldQuantityError.value = 'Sold quantity must be a non-negative number'
    isValid = false
  }

  if (pageCount.value <= 0 || isNaN(Number(pageCount.value))) {
    pageCountError.value = 'Page count must be a positive number'
    isValid = false
  }

  if (barcode.value <= 0 || isNaN(Number(barcode.value))) {
    barcodeError.value = 'Barcode must be a positive number'
    isValid = false
  }

  if (homeOrder.value < 0 || isNaN(Number(homeOrder.value))) {
    homeOrderError.value = 'Home order must be a non-negative number'
    isValid = false
  }

  return isValid
}

const inputs = computed<FieldInput[]>(() => [
  {
    label: 'Book Name',
    placeholder: 'Book Name',
    inputType: 'text',
    id: 'name',
    name: 'name',
    value: name.value,
    error: nameError.value,
  },
  {
    label: 'Price',
    placeholder: 'Enter price',
    inputType: 'number',
    id: 'price',
    name: 'price',
    value: price.value,
    error: priceError.value,
  },
  {
    label: 'Price Entry',
    placeholder: 'Enter price entry',
    inputType: 'number',
    id: 'price_entry',
    name: 'price_entry',
    value: priceEntry.value,
    error: priceEntryError.value,
  },
  {
    label: 'Avatar',
    placeholder: 'Upload avatar',
    inputType: 'url',
    id: 'avatar',
    name: 'avatar',
    value: avatar.value,
    error: avatarError.value,
  },
  {
    label: 'Quantity',
    placeholder: 'Enter quantity',
    inputType: 'number',
    id: 'quantity',
    name: 'quantity',
    value: quantity.value,
    error: quantityError.value,
  },
  {
    label: 'Publish Year',
    placeholder: 'Enter publish year',
    inputType: 'number',
    id: 'publish_year',
    name: 'publish_year',
    value: publishYear.value,
    error: publishYearError.value,
  },
  {
    label: 'Size',
    placeholder: 'Enter book size',
    inputType: 'text',
    id: 'size',
    name: 'size',
    value: size.value,
    error: sizeError.value,
  },
  {
    label: 'Page Count',
    placeholder: 'Enter page count',
    inputType: 'number',
    id: 'page_count',
    name: 'page_count',
    value: pageCount.value,
    error: pageCountError.value,
  },
  {
    label: 'Barcode',
    placeholder: 'Enter barcode',
    inputType: 'text',
    id: 'barcode',
    value: barcode.value,
    error: barcodeError.value,
  },
  {
    label: 'Sold Quantity',
    placeholder: 'Enter sold quantity',
    inputType: 'number',
    id: 'sold_quantity',
    name: 'sold_quantity',
    value: soldQuantity.value,
    error: soldQuantityError.value,
  },
  {
    label: 'Home Order',
    placeholder: 'Enter home order',
    inputType: 'number',
    id: 'home_order',
    name: 'home_order',
    value: homeOrder.value,
    error: homeOrderError.value,
  },
])

const selects = computed(() => [
  {
    label: 'Category',
    id: 'category',
    name: 'category_id',
    error: '',
    options: categoryStore.categories.map((category) => ({
      value: category.id.toString(),
      selected: false,
      title: category.name,
    })),
  },
  {
    label: 'Author',
    id: 'author_id',
    name: 'author_id',
    error: '',
    options: authorStore.authors.map((author) => ({
      value: author.id.toString(),
      selected: false,
      title: author.name,
    })),
  },
  {
    label: 'Is Featured',
    id: 'is_featured',
    name: 'is_featured',
    error: '',
    options: [
      {
        value: 1,
        selected: true,
        title: 'Yes',
      },
      {
        value: 0,
        selected: false,
        title: 'No',
      },
    ],
  },
  {
    label: 'Publisher',
    id: 'publisher_id',
    name: 'publisher_id',
    error: '',
    options: [
      {
        value: 1,
        selected: true,
        title: 'Nhi Dong',
      },
      {
        value: 2,
        selected: false,
        title: 'Giao Duc',
      },
    ],
  },
  {
    label: 'Supplier',
    id: 'supplier_id',
    name: 'supplier_id',
    error: '',
    options: [
      {
        value: 1,
        selected: true,
        title: 'Hong Ha',
      },
      {
        value: 2,
        selected: false,
        title: 'Kim Lien',
      },
    ],
  },
  {
    label: 'Cover Type',
    id: 'cover_type',
    name: 'cover_type',
    error: '',
    options: [
      {
        value: 1,
        selected: true,
        title: 'Hard cover',
      },
      {
        value: 0,
        selected: false,
        title: 'home paper',
      },
    ],
  },
])

const textAreas = computed<FieldInput[]>(() => [
  {
    label: 'Description',
    placeholder: 'Description',
    id: 'long_description',
    name: 'long_description',
    value: longDescription.value,
    error: longDescriptionError.value,
  },
  {
    label: 'Short Description',
    placeholder: 'Enter short description',
    inputType: 'textarea',
    id: 'sort_description',
    name: 'sort_description',
    value: sortDescription.value,
    error: sortDescriptionError.value,
  },
])

const addBook = async (event: Event) => {
  const formData = new FormData(event.target as HTMLFormElement)
  const formObject = Object.fromEntries(formData.entries())
  name.value = formObject.name as string
  price.value = Number(formObject.price)
  priceEntry.value = Number(formObject.price_entry)
  avatar.value = formObject.avatar as string
  quantity.value = Number(formObject.quantity)
  longDescription.value = formObject.long_description as string
  sortDescription.value = formObject.sort_description as string
  publishYear.value = Number(formObject.publish_year)
  size.value = Number(formObject.size)
  soldQuantity.value = Number(formObject.sold_quantity)
  pageCount.value = Number(formObject.page_count)
  barcode.value = Number(formObject.barcode)
  homeOrder.value = Number(formObject.home_order)

  const isValid = validateForm()
  if (!isValid) return

  try {
    await addBookAPI(formData)
    notificationStore.setNotification({
      title: 'Success',
      message: 'Add Book Successfully',
      type: 'success',
    })

    await router.push('/product-stock')
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Add Book Failed'
    notificationStore.setNotification({
      title: 'Error',
      message: errorMessage,
      type: 'error',
    })
  }
}
</script>

<template>
  <BaseTitle :title="title" />

  <div class="detail">
    <div class="contact-container">
      <form class="contact-form" @submit.prevent="addBook">
        <div class="form-row">
          <BaseInput :inputs="inputs" />
          <BaseSelectBox :selects="selects" />
        </div>
        <div class="text-area">
          <BaseTextArea :inputs="textAreas" />
        </div>
        <BaseButton title="Add Now" />
      </form>
    </div>
  </div>
</template>

<style scoped>
.detail {
  overflow: auto;
  max-height: calc(100vh - 200px);
  scrollbar-width: none;
}

.contact-container {
  background-color: #fff;
  width: 100%;
  padding: 60px 180px;
  border-radius: 14px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
  margin-bottom: 24px;
  align-items: center;
  justify-content: center;
}

.text-area {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 45px;
}

::v-deep(.btn button) {
  font-size: 17px;
  font-weight: 700;
  padding: 16px 32px;
  border-radius: 12px;
  width: 274px;
  margin-top: 38px;
}

::v-deep(.btn button:hover) {
  background-color: #3a6ad9;
}

::v-deep(.form-group) {
  margin-bottom: 0;
}

::v-deep(input),
::v-deep(select) {
  width: 360px;
  height: 52px;
}

::v-deep(.label) {
  color: #606060;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 11px;
}

::v-deep(select) {
  text-align: left;
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  background-color: #f9fafb;
  margin-bottom: 15px;
}
</style>
