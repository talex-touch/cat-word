import { ref, watch } from 'vue'

// 定义类型
export interface Category extends API.Category {
  children: Category[]
  books: Book[]
}
type Book = API.EnglishDictionaryWithCategoryVO

export function useCategoryTree(data: Book[]) {
  const categoryTree = ref<Category[]>([])

  watch(
    () => data,
    (newData) => {
      const categoryMap = new Map<number, Category>()

      // 第一步：收集所有唯一分类，并初始化树节点
      newData.forEach((book) => {
        book.categoryList?.forEach((category) => {
          const categoryId = category.id
          if (!categoryMap.has(categoryId!)) {
            categoryMap.set(categoryId!, {
              ...category,
              children: [],
              books: [],
            })
          }
        })
      })

      // 第二步：构建树形结构
      const rootNodes: Category[] = []
      categoryMap.forEach((category) => {
        const parentId = category.parentId
        if (parentId === 0 || !categoryMap.has(parentId!)) {
          rootNodes.push(category)
        }
        else {
          const parent = categoryMap.get(parentId!)
          if (parent) {
            parent.children.push(category)
          }
        }
      })

      // 第三步：将教材分配到对应的分类
      newData.forEach((book) => {
        book.categoryList?.forEach((category) => {
          const node = categoryMap.get(category.id!)
          if (node) {
            node.books.push(book)
          }
        })
      })

      categoryTree.value = rootNodes
    },
    { immediate: true, deep: true },
  )

  return categoryTree
}
