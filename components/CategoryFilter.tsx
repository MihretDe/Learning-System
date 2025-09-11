// components/CategoryFilter.tsx
"use client" // This is a client component

interface CategoryFilterProps {
  categories: string[]
  onSelectCategory: (category: string) => void
  selectedCategory: string
}

function CategoryFilter({ categories, onSelectCategory, selectedCategory }: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Filter by Category</h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onSelectCategory("All")}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === "All"
              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
          }`}
        >
          All Courses
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter
