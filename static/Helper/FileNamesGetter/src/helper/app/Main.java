package helper.app;

import java.io.File;
import java.lang.reflect.Array;
import java.nio.file.Files;
import java.util.*;
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        listFilesFromFolder("../../images");
    }
    public static void listFilesFromFolder(String pathToFolder){
//        Create list of folders with photos in images directory
        List<File> folder = new ArrayList<>(
                Arrays.asList(Objects.requireNonNull(
                        new File(pathToFolder).listFiles())));
//        Filter only directories with motorcycle photos
        folder.removeIf(file -> !file.isDirectory());
        folder.removeIf(file -> file.toPath().endsWith("footer") ||
                file.toPath().endsWith("favicon"));
//        folder.forEach(System.out::println);
        for(File dict : folder){

            List<File> photos = new ArrayList<>(
                    List.of(Objects.requireNonNull(dict.listFiles())));
            photos.removeIf(file -> (file.getName().endsWith("json") || file.getName().endsWith("mp4")));
            photos.sort((File o1, File o2) -> {
                try {
                    Integer name1 = fileNameAsInteger(o1);
                    Integer name2 = fileNameAsInteger(o2);
                    return name1.compareTo(name2);
                }catch (NumberFormatException e){
                    return o1.compareTo(o2);
                }
            });
            List<String> names = new ArrayList<>();
            photos.forEach(photo -> names.add(photo.getName()));

            System.out.println("---------------");
            System.out.println(dict.getName());
            System.out.println("---------------");
            StringBuilder infoString = new StringBuilder("[");
            for(String name : names){
                infoString.append(name)
                        .append(",");
            }
            infoString.replace(infoString.length()-1, infoString.length(),"");
            infoString.append("]");
            System.out.println(infoString);




        }

    }

    public static Integer fileNameAsInteger(File file){
        return Integer.parseInt(file.getName().substring(0, file.getName().lastIndexOf(".")));
    }
}
