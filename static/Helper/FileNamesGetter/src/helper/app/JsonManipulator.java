package helper.app;


import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.stream.JsonReader;

import java.io.*;
import java.util.Arrays;
import java.util.List;

public class JsonManipulator {
    public static void overrideJsonPicList(String path, List<String> listOfNames) throws IOException {
        try {
            File jsonFile = new File(path);
            Gson gson = new Gson();
            JsonReader reader = new JsonReader(new FileReader(jsonFile));
            JsonObject data = gson.fromJson(reader, JsonObject.class); // contains the whole reviews list
            JsonArray arr = new JsonArray();
            System.out.println("""
                    -----------------------------
                    OLD LIST
                    ______________________________""");
            System.out.println(data.get("picList"));

            listOfNames.forEach(arr::add);
            data.add("picList", arr);
            System.out.println("""
                    -----------------------------
                    NEW LIST
                    ______________________________""");
            System.out.println(data.get("picList"));
            System.out.println(data);

            Writer writer = new FileWriter(path);
            gson.toJson(data, writer);
            reader.close();
            writer.close();

        } catch (FileNotFoundException e) {
            System.out.println(path + " JSON not found");
        }
    }

    public static JsonObject getJsonData(String pathToJson) throws IOException {
        try{
        File file = new File(pathToJson);
        Gson gson = new Gson();
        JsonReader reader = new JsonReader(new FileReader(file));
        JsonObject data = gson.fromJson(reader,JsonObject.class);
        reader.close();
        return data;
        } catch (FileNotFoundException e){
            System.out.println("JSON not Found");
            return null;
        }
    }

}
