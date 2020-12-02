import Vue from "vue";

// initial state
const state = () => ({});

// getters
const getters = {};

// actions
const actions = {
  async fetchRef({ rootState: { octokit }, commit }, { owner, repo, ref }) {
    if (octokit) {
      let data,
        prefix = "";

      if (!ref.startsWith("heads/") && !ref.startsWith("tags/")) {
        prefix = "heads/";
      }

      try {
        data = (
          await octokit.git.getRef({
            owner,
            repo,
            ref: `${prefix}${ref}`,
          })
        ).data;
      } catch (e) {
        prefix = "tags/";
      }

      if (!data) {
        try {
          data = (
            await octokit.git.getRef({
              owner,
              repo,
              ref: `${prefix}${ref}`,
            })
          ).data;
        } catch (e) {
          data = {};
        }
      }

      commit("setRef", {
        owner,
        repo,
        ref,
        data,
      });

      return data;
    }
  },
};

// mutations
const mutations = {
  setRef(state, { owner, repo, ref, data }) {
    if (!state[owner]) {
      Vue.set(state, owner, {});
    }

    if (!state[owner][repo]) {
      Vue.set(state[owner], repo, {});
    }

    Vue.set(state[owner][repo], ref, data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
