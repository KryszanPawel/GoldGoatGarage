package helper.app;

//import com.google.gson.JsonArray;
//import com.google.gson.JsonObject;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.*;
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) throws IOException {
        String pathToPhotos = "./../images";
        writeSortedFileNamesToJSON(pathToPhotos);
//        reduceSizeOfPhotos(pathToPhotos);
    }

    public static void writeSortedFileNamesToJSON(String pathToFolder) throws IOException {
//        Create list of folders with photos in images directory
        System.out.println(Path.of(pathToFolder).toAbsolutePath());
        List<File> folder = new ArrayList<>(
                Arrays.asList(Objects.requireNonNull(
                        new File(pathToFolder).listFiles())));
//        Filter only directories with motorcycle photos
        filterFolders(folder);
//        For every directory in folder sort by names and prepare
        for(File dir : folder){
            List<String> fileNames = prepareOutputList(dir);
            JsonManipulator.overrideJsonPicList(dir + "/info.json", fileNames);
        }
    }

    public static Integer fileNameAsInteger(File file){
        return Integer.parseInt(file.getName().substring(0, file.getName().lastIndexOf(".")));
    }

    public static void filterFolders(List<File> folder){
        Predicate<File> p0 = file -> !file.isDirectory();
        Predicate<File> p1 = file -> !file.toPath().endsWith("footer") ||
                file.toPath().endsWith("favicon");
        folder.removeIf(file -> !file.isDirectory());
        folder.removeIf(file -> file.toPath().endsWith("footer") ||
                file.toPath().endsWith("favicon"));
//        folder.forEach(System.out::println);
    }

    public static List<String> prepareOutputList(File dir){
        List<File> photos = new ArrayList<>(
                List.of(Objects.requireNonNull(dir.listFiles())));
//        Only pictures required
        photos.removeIf(file -> (file.getName().endsWith("json") || file.getName().endsWith("mp4")));
//        Sort by number in name
        photos.sort((File o1, File o2) -> {
            try {
                Integer name1 = fileNameAsInteger(o1);
                Integer name2 = fileNameAsInteger(o2);
                return name1.compareTo(name2);
            }catch (NumberFormatException e){
                return o1.compareTo(o2);
            }
        });
//        List of names
        List<String> names = new ArrayList<>();
        photos.forEach(photo -> names.add(photo.getName()));

        System.out.println("---------------");
        System.out.println(dir.getName());
        System.out.println("---------------");
        return names;
    }

//    public static void reduceSizeOfPhotos(String pathToFolder) throws IOException {
//        Scanner scan = new Scanner(System.in);
//
//        System.out.println("""
//                This part of program will reduce size of photos exciting 1MB.
//                This will cause quality lose on photos.
//                Are you sure, you want to do this? (Y/N)""");
//        char answer = scan.nextLine().toUpperCase().charAt(0);
//
//        switch (answer) {
//            case 'Y' -> startCompression(pathToFolder);
//            case 'N' -> System.out.println("Closing without compression.");
//            default -> {
//                System.out.println("Try again");
//                reduceSizeOfPhotos(pathToFolder);
//            }
//        }
//    }

    private static String getPathToJson(File dir){
        List<File> jsonFiles = new ArrayList<>(
                Arrays.asList(Objects.requireNonNull(dir.listFiles())));
        jsonFiles.removeIf(f -> !f.getName().endsWith("json"));
        if(jsonFiles.size() == 0) {
            return null;
        }
        return jsonFiles.get(0).toString();
    }

//    private static void compressPhoto(String pathToPhoto) throws IOException {
//        PhotoResizer.photoResize(pathToPhoto);
//    }

//    private static void startCompression(String pathToFolder) throws IOException {
//        List<File> folder = new ArrayList<>(
//                Arrays.asList(Objects.requireNonNull(
//                        new File(pathToFolder).listFiles())));
//        filterFolders(folder);
//        for(File dir : folder){
//            String pathToJson = getPathToJson(dir);
//            if(pathToJson == null){
//                System.out.println("No JSON file compression interrupted in " + dir);
//                continue;
//            }
//            JsonObject data = JsonManipulator.getJsonData(pathToJson);
//            JsonArray listArr = (JsonArray) data.get("picList");
//            listArr.forEach(s -> {
//                try {
//                    compressPhoto(pathToJson.replaceAll("info\\.json","")
//                            + s.toString().replaceAll("\"", ""));
//                } catch (IOException e) {
//                    throw new RuntimeException(e);
//                }
//            });
//
//        }
//
//        System.out.println("Compression complete!");
//    }
}
