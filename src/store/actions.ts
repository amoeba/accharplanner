import {
  Character,
  Build
} from "../types";
import firebase from "../firebase";
import { firestore } from 'firebase';


export default {
  shareBuild(context: any) {
    // Reset state and clean out current shared build first
    context.state.ui.shareStatus = null;
    context.state.ui.sharedBuild = null;

    const db = firebase.firestore();

    db.collection("builds")
      .add(context.state.build as firestore.DocumentData)
      .then(function (doc: firestore.DocumentData) {
        context.state.ui.shareStatus = null;
        context.state.ui.sharedBuild = doc.id;
      })
      .catch(error => {
        context.state.ui.shareStatus = "Error: " + error;
      });
  },
  loadRemoteBuild(context: any, build_id: string) {
    context.commit("addNotification", {
      type: "info",
      message: "Loading build from share link.. *portal sounds*."
    });

    const db = firebase.firestore();

    db.collection("builds")
      .doc(build_id)
      .get()
      .then(function (doc: firestore.DocumentData) {
        // Check if old style build or new style
        const data = doc.data();

        if ("character" in data) {
          context.state.build = doc.data() as Character;

          // Change to first stage if appropriate
          if (context.state.build.stages.length > 0) {
            context.commit("changeStage", 0);
          }
        } else {
          context.state.build.character = doc.data() as Character;
          context.state.build.stages = [] as Character[];
        }

        context.commit("addNotification", {
          type: "success",
          message: "Successfully loaded build!"
        });
      })
      .catch(error => {
        context.commit("addNotification", {
          type: "error",
          message: "Failed to load build '" + build_id + "' with error '" + error + "'."
        });
      });
  },
  import(context: any, build: any) {
    context.state.build = build;

    context.commit("addNotification", {
      type: "success",
      message: "Successfully imported build."
    });
  },
}
