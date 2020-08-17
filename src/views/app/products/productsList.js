const productsListData = {
  modal: { _id: "", title: "", body:"", function:"" },
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

export { productsListData }
