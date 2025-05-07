<script setup lang="ts">
import BaseTitle from '@/components/common/BaseTitle.vue'
import { computed, onMounted, ref } from 'vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseTextArea from '@/components/common/BaseTextArea.vue'
import type { Book, Category, Author, Input as FieldInput } from '@/types'
import { useCategoryStore } from '@/stores/CategoryStore.ts'
import { useAuthorStore } from '@/stores/AuthorStore.ts'
import BaseSelectBox from '@/components/common/BaseSelectBox.vue'
import { useRouter, useRoute } from 'vue-router'
import { updateBookAPI, findBookById } from '@/apis/BookAPI.ts'
import { useNotificationStore } from '@/stores/NotificationStore.ts'

const title = 'Update Product'
const categoryStore = useCategoryStore()
const authorStore = useAuthorStore()
const notificationStore = useNotificationStore()
const router = useRouter()
const route = useRoute()
const book = ref<Book>({
  id: 0,
  category: {} as Category,
  author: {} as Author,
  name: '',
  price: 0,
  price_entry: 0,
  avatar: null,
  quantity: 0,
  sort_description: '',
  long_description: '',
  publish_year: 0,
  size: 0,
  cover_type: 0,
  sold_quantity: 0,
  page_count: 0,
  barcode: 0,
  home_order: 0,
  is_featured: 0,
  publisher_id: 0,
  supplier_id: 0,
})

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

const fetchBooks = async () => {
  const bookId = Number(route.params.id)
  book.value = await findBookById(bookId)
}

onMounted(() => {
  fetchBooks()
})

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

  if (book.value.name.trim().length === 0) {
    nameError.value = 'Name is required'
    isValid = false
  }

  if (book.value.price <= 0 || isNaN(Number(book.value.price))) {
    priceError.value = 'Price must be a positive number'
    isValid = false
  }

  if (book.value.price_entry <= 0 || isNaN(Number(book.value.price_entry))) {
    priceEntryError.value = 'Entry price must be a positive number'
    isValid = false
  }

  if (book.value.avatar === null) {
    avatarError.value = 'Avatar URL is required'
    isValid = false
  } else if (!/^https?:\/\/.+\..+/.test(book.value.avatar)) {
    avatarError.value = 'Invalid URL format'
    isValid = false
  }

  if (book.value.quantity < 0 || isNaN(Number(book.value.quantity))) {
    quantityError.value = 'Quantity must be a non-negative number'
    isValid = false
  }

  if (book.value.long_description.trim().length < 20) {
    longDescriptionError.value = 'Long description must be at least 20 characters'
    isValid = false
  }

  if (book.value.sort_description.trim().length < 10) {
    sortDescriptionError.value = 'Short description must be at least 10 characters'
    isValid = false
  }

  if (
    book.value.publish_year < 1900 ||
    book.value.publish_year > new Date().getFullYear() ||
    isNaN(Number(book.value.publish_year))
  ) {
    publishYearError.value = 'Publish year must be a valid year'
    isValid = false
  }

  if (book.value.size <= 0 || isNaN(Number(book.value.size))) {
    sizeError.value = 'Size must be a positive number'
    isValid = false
  }

  if (book.value.sold_quantity < 0 || isNaN(Number(book.value.sold_quantity))) {
    soldQuantityError.value = 'Sold quantity must be a non-negative number'
    isValid = false
  }

  if (book.value.page_count <= 0 || isNaN(Number(book.value.page_count))) {
    pageCountError.value = 'Page count must be a positive number'
    isValid = false
  }

  if (book.value.barcode <= 0 || isNaN(Number(book.value.barcode))) {
    barcodeError.value = 'Barcode must be a positive number'
    isValid = false
  }

  if (book.value.home_order < 0 || isNaN(Number(book.value.home_order))) {
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
    value: book.value.name || '',
    error: nameError.value,
  },
  {
    label: 'Price',
    placeholder: 'Enter price',
    inputType: 'number',
    id: 'price',
    name: 'price',
    value: book.value.price ?? 0,
    error: priceError.value,
  },
  {
    label: 'Price Entry',
    placeholder: 'Enter price entry',
    inputType: 'number',
    id: 'price_entry',
    name: 'price_entry',
    value: book.value.price_entry,
    error: priceEntryError.value,
  },
  {
    label: 'Avatar',
    placeholder: 'Upload avatar',
    inputType: 'url',
    id: 'avatar',
    name: 'avatar',
    value: book.value.avatar ?? '',
    error: avatarError.value,
  },
  {
    label: 'Quantity',
    placeholder: 'Enter quantity',
    inputType: 'number',
    id: 'quantity',
    name: 'quantity',
    value: book.value.quantity ?? 0,
    error: quantityError.value,
  },
  {
    label: 'Publish Year',
    placeholder: 'Enter publish year',
    inputType: 'number',
    id: 'publish_year',
    name: 'publish_year',
    value: book.value.publish_year ?? 0,
    error: publishYearError.value,
  },
  {
    label: 'Size',
    placeholder: 'Enter book size',
    inputType: 'text',
    id: 'size',
    name: 'size',
    value: book.value.size?.toString() ?? '',
    error: sizeError.value,
  },
  {
    label: 'Page Count',
    placeholder: 'Enter page count',
    inputType: 'number',
    id: 'page_count',
    name: 'page_count',
    value: book.value.page_count ?? 0,
    error: pageCountError.value,
  },
  {
    label: 'Barcode',
    placeholder: 'Enter barcode',
    inputType: 'text',
    id: 'barcode',
    name: 'barcode',
    value: book.value.barcode,
    error: barcodeError.value,
  },
  {
    label: 'Sold Quantity',
    placeholder: 'Enter sold quantity',
    inputType: 'number',
    id: 'sold_quantity',
    name: 'sold_quantity',
    value: book.value.sold_quantity ?? 0,
    error: soldQuantityError.value,
  },
  {
    label: 'Home Order',
    placeholder: 'Enter home order',
    inputType: 'number',
    id: 'home_order',
    name: 'home_order',
    value: book.value.home_order ?? 0,
    error: homeOrderError.value,
  },
])

const selects = computed(() => [
  {
    label: 'Category',
    id: 'category',
    name: 'category_id',
    value: book.value.category.id,
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
    value: book.value.author.id,
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
    value: book.value.is_featured,
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
    value: book.value.publisher_id,
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
    value: book.value.supplier_id,
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
    value: book.value.cover_type,
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
    value: book.value.long_description,
    error: longDescriptionError.value,
  },
  {
    label: 'Short Description',
    placeholder: 'Enter short description',
    inputType: 'textarea',
    id: 'sort_description',
    name: 'sort_description',
    value: book.value.sort_description,
    error: sortDescriptionError.value,
  },
])

const updateBook = async (event: any) => {
  const formData = new FormData(event.target)
  const formObject = Object.fromEntries(formData.entries())
  book.value.name = formObject.name as string
  book.value.price = Number(formObject.price)
  book.value.price_entry = Number(formObject.price_entry)
  book.value.avatar = formObject.avatar as string
  book.value.quantity = Number(formObject.quantity)
  book.value.long_description = formObject.long_description as string
  book.value.sort_description = formObject.sort_description as string
  book.value.publish_year = Number(formObject.publish_year)
  book.value.size = Number(formObject.size)
  book.value.sold_quantity = Number(formObject.sold_quantity)
  book.value.page_count = Number(formObject.page_count)
  book.value.barcode = Number(formObject.barcode)
  book.value.home_order = Number(formObject.home_order)

  const isValid = validateForm()
  if (!isValid) return
  try {
    await updateBookAPI(Number(route.params. id), formData)
    notificationStore.setNotification({
      title: 'Success',
      message: 'Update Author Successfully',
      type: 'success',
    })
    await router.push('/product-stock')
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Update Book Failed'
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
      <form class="contact-form" @submit.prevent="updateBook">
        <div class="form-row">
          <BaseInput :inputs="inputs" />
          <BaseSelectBox :selects="selects" />
        </div>
        <div class="text-area">
          <BaseTextArea :inputs="textAreas" />
        </div>
        <BaseButton title="Save Changes" />
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
