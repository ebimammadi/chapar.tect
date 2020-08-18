const modal = { _id: "", title: "", body:"", function:"" }

const productsListData = {
  modal: modal,
  productsRaw: { products: [] },
  fields: [
    { key: "_id" , label: "" },  
    { key: "name" , label: "Product" },  
    { key: "ownerId", label: "Supplier" },
    { key: "publishStatus" , label: "Published" },  
    { key: "date", label: "Date" },
  ],
  publishStatusOptions: [
    { text: 'All', value: '' }, 
    { text: 'Published', value: 'true' },
    { text: 'Unpublished', value: 'false' },
  ]
}

const productsPageData = {
  show: false,
  messageObject: {},
  modal: modal,
  product: {
    _id: '',
    name: '',
    slug: '',
    price: '',
    description: '',
    features: [],
    images: [],
  },
  validation: {
    name: `Product 'Name' is very short`,
    price: `You need to specify a 'price'.`
  }
}
export { productsListData, productsPageData }
