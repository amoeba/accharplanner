import { Character, Build } from "../types";
import { getFirestore, collection, doc, getDoc, addDoc } from "firebase/firestore/lite";
import firebaseApp from "../firebase";
import { merge } from "lodash"
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

        const data = snap.data();
        // Support old data format by looking at the structure and loading
        // accordingly. The new format has top-level keys of character and
        // stages while the old format has all the keys of the character right
        // at the top level.
        if ("character" in data) {
          // Load the character portion of the build
          const char = DefaultCharacter()
          merge(char, data.character)
          context.state.build.character = char;

          // Then populate stages
          let stages = [];

          for (let i = 1; i < data.stages.length; i++) {
            let newStage = DefaultCharacter();
            merge(newStage, data.stages[i]);
            stages.push(newStage);
          }

          context.state.build.stages = stages;

          // Change to first stage if appropriate
          if (context.state.build.stages.length > 0) {
            context.commit("changeStage", 0);
          }
        } else {
          const char = DefaultCharacter()
          merge(char, data.character)

          context.state.build.character = char;
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
