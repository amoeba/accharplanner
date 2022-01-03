import { Character, Build } from "../types";
import { getFirestore, collection, doc, getDoc, addDoc } from "firebase/firestore/lite";
import firebaseApp from "../firebase";
import DefaultCharacter from "./DefaultCharacter";

export default {
  shareBuild(context: any) {
    // Reset state and clean out current shared build first
    context.state.ui.shareStatus = null;
    context.state.ui.sharedBuild = null;

    const db = getFirestore(firebaseApp);
    const buildsRef = collection(db, "builds");

    addDoc(buildsRef, context.state.build)
      .then(docRef => {
        context.state.ui.shareStatus = null;
        context.state.ui.sharedBuild = docRef.id;
      })
      .catch(error => {
        context.state.ui.shareStatus = "Error: " + error;
      });
  },
  loadRemoteBuild(context: any, options: any) {
    context.commit("addNotification", {
      type: "info",
      message: "Loading build from share link.. *portal sounds*."
    });

    const db = getFirestore(firebaseApp);
    const docRef = doc(db, "builds", options.build_id);

    getDoc(docRef)
      .then((snap) => {
        if (!snap.exists()) {
          throw Error(`Build ${options.build_id} not found.`);
        }

        // Check if old style build or new style
        const data = snap.data();

        // New format
        if ("character" in data) {
          context.state.build = snap.data() as Character;

          // Change to first stage if appropriate
          if (context.state.build.stages.length > 0) {
            context.commit("changeStage", 0);
          }
        } else {
          context.state.build.character = snap.data() as Character;
          context.state.build.stages = [] as Character[];
        }

        context.commit("addNotification", {
          type: "success",
          message: "Successfully loaded build!"
        });

        options.router.push("/")
      })
      .catch((error) => {
        context.commit("addNotification", {
          type: "error",
          message:
            "Failed to load build '" +
            options.build_id +
            "' with error '" +
            error +
            "'."
        });
      });
  },
  import(context: any, build: Build) {
    context.state.build = build;

    context.commit("addNotification", {
      type: "success",
      message: "Successfully imported build."
    });
  },
  reorderStages(context: any, newOrder: any) {
    context.commit("reorderStages", newOrder);
  }
};
