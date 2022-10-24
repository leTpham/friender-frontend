import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class FrienderApi {
  static token = null;

  static async request(endpoint, data = {}, method = "get") {
    // console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${FrienderApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response.data.message);

      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get token for login from username, password */
  static async login(data) {
    const resp = await this.request("login", data, "post");
    return resp.token;
  }

  /** Get all users */
  static async getAllUsers() {
    const resp = await this.request("users");
    return resp.users;
  }

  /** Get one user by username in params */
  static async getOneUser(username) {
    const resp = await this.request(`users/${username}`);
    return resp.user;
  }

  /** Like another user by their name in params */
  static async likeOneUser(username) {
    const resp = await this.request(`users/${username}/like`, {}, "post");
    return resp.message;
  }

  /** Disike another user by their name in params */
  static async dislikeOneUser(username) {
    const resp = await this.request(`users/${username}/dislike`, {}, "post");
    return resp.message;
  }

  /** Get all users */
  static async getMatches() {
    const resp = await this.request("matches");
    return resp.matches;
  }
}

export default FrienderApi;