import axios from "axios"

export const postModule = {
    state: () => ({
        posts: [],
        dialogVisible: false,
        selectedSort: '',
        sortOptions: [
            {value: 'id', name: 'По умолчанию'},
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По содержимому'}
        ],
        searchQuery: '',
        page: 0,
        limit: 10,
        totalPages: 0,
        isPostLoading: true,
        observerTarget: null,
    }),
    getters: {
        sortedPosts(state) {
            if (state.selectedSort === 'id'){
                return [...state.posts].sort((post1, post2) => post1[state.selectedSort] - post2[state.selectedSort])
            }
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndSearchPosts(state, getters){
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setDialogVisible(state, dialogVisible) {
            state.dialogVisible = dialogVisible
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
        setPage(state, page) {
            state.page = page
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setIsPostLoading(state, isPostLoading) {
            state.isPostLoading = isPostLoading
        }, 
        setObserverTarget(state, observerTarget) {
            state.observerTarget = observerTarget
        }
    },
    actions: {
        async loadMorePosts({state, commit, }) {
            try {
                commit('setPage', state.page + 1)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit,
                    }
                })
                commit('setTotalPages',Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', [...state.posts, ...response.data])
            } catch (e) {
                alert('Ошибка запроса к https://jsonplaceholder.typicode.com/posts')
            } finally {
                commit('setIsPostLoading', false)
            }
        },
    },
    namespaced: true // Чтобы указывать название модуля перед работой с чем-либо в модуле
}